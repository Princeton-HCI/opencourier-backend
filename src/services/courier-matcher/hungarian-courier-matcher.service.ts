import { Injectable, Logger } from '@nestjs/common';
import { ICourierMatcherInput } from './interfaces/ICourierMatcherInput';
import { ICourierMatcherService } from './interfaces/ICourierMatcherService';
import { ICourierMatcherResult } from './interfaces/ICourierMatcherResult';
import { GeoPosition } from 'src/shared-types/geo';
import { Munkres } from 'munkres-js';
import * as math from 'mathjs';
import { CourierDomainService } from 'src/domains/courier/courier.domain.service';
import { ConfigDomainService } from 'src/domains/config/config.domain.service';

const HIGH_COST = 1000;
const DISTANCE_THRESHOLD = 10;
const MAX_PRICE = 100;
const WEIGHTS = {
  area: 0.2,
  distance: 0.2,
  location_type: 0.2,
  item_type: 0.2,
  price: 0.2,
}; // weight for score calculation 
const LOCATION_TYPE_SCORES = {
  urban: 1.0,
  suburban: 0.8,
  rural: 0.5,
};

@Injectable()
export class HungarianCourierMatcherService implements ICourierMatcherService {
  private readonly logger = new Logger(HungarianCourierMatcherService.name);

  constructor(
    private readonly courierDomainService: CourierDomainService,
    private readonly configDomainService: ConfigDomainService
  ) {}

  async matchCouriersToDeliveries(
    deliveriesInput: ICourierMatcherInput[]
  ): Promise<ICourierMatcherResult[]> {
    // Get all available couriers
    const availableCouriers = await this.courierDomainService.findAllAvailable({});
    if (!availableCouriers || availableCouriers.length === 0) {
      return []; // No couriers available
    }

    // Transform deliveries and couriers into the required format
    const deliveries = this.transformDeliveries(deliveriesInput);
    const couriers = this.transformCouriers(availableCouriers);

    const numOrders = deliveries.length;
    const numCouriers = couriers.length;
    const size = Math.max(numOrders, numCouriers);
    const costMatrix = math.ones(size, size).map(() => HIGH_COST) as math.Matrix;

    // Fill the cost matrix with compatibility scores
    for (let i = 0; i < numOrders; i++) {
      for (let j = 0; j < numCouriers; j++) {
        costMatrix.subset(
          math.index(i, j),
          this.calculateCompatibility(deliveries[i], couriers[j])
        );
      }
    }

    // Convert matrix to array for Munkres algorithm
    const costMatrixArray = costMatrix.toArray() as number[][];

    // Call the Munkres algorithm
    const munkres = new Munkres();
    const indices = munkres.compute(costMatrixArray);

    // Map the results to courier-delivery pairs
    const results: ICourierMatcherResult[] = [];
    for (const [orderIndex, courierIndex] of indices) {
      if (
        orderIndex !== undefined && orderIndex < numOrders &&
        courierIndex !== undefined && courierIndex < numCouriers &&
        costMatrixArray[orderIndex]?.[courierIndex] !== undefined &&
        costMatrixArray[orderIndex]?.[courierIndex] !== HIGH_COST
      ) {
        const courierId = couriers[courierIndex]?.id;
        const deliveryId = deliveries[orderIndex]?.id;
        const distance = this.calculateDistance(
          deliveries[orderIndex]?.start_location ?? { latitude: 0, longitude: 0 },
          couriers[courierIndex]?.location ?? { latitude: 0, longitude: 0 }
        );

        if (courierId && deliveryId) {
          results.push({
            courierId,
            deliveryId,
            distance,
          });
        }
      }
    }

    return results; // Return all matched courier-delivery pairs
  }

  async findCourierForDelivery(
    deliveryInput: ICourierMatcherInput
  ): Promise<ICourierMatcherResult | null> {
    // Treat the single delivery as a batch with one delivery
    const batchResult = await this.matchCouriersToDeliveries([deliveryInput]);

    // If no result is found, return null
    if (!batchResult || batchResult.length === 0) {
      return null; // No suitable courier found
    }

    // Return the first (and only) result from the batch
    return batchResult[0] ?? null;
  }

  // Private helper methods

  /**
   * Transforms delivery inputs into the required format.
   */
  private transformDeliveries(deliveriesInput: ICourierMatcherInput[]) {
    return deliveriesInput.map((input) => ({
      id: input.deliveryId,
      start_location: input.pickupLocation,
      end_location: input.dropoffLocation,
      contains: input.contains || [],
      restaurantTags: input.restaurantTags || [],
      totalComp: input.totalCompensation || 0,
      area: input.area,
    }));
  }

  /**
   * Transforms couriers into the required format.
   */
  private transformCouriers(couriers: any[]) {
    return couriers.map((courier) => ({
      id: courier.id,
      location: courier.currentLocation,
      hard: {
        order_restrictions: courier.restrictions || [],
      },
      soft: {
        preferences: courier.preferences || [],
      },
    }));
  }

  /**
   * Calculates the compatibility score between a delivery and a courier.
   */
  private calculateCompatibility(order: any, courier: any): number {
    let areaScore = 0.5; // default neutral score
    if (order.area && courier.soft.preferences?.includes(order.area)) {
      areaScore = 1.0; // preferred area
    }else {
        areaScore = 0.5; //TODO: return high cost if in invalid area
  }

      // Distance score
      const distanceToStart = this.calculateDistance(order.start_location, courier.location);
      let distanceScore = Math.max(0, 1 - distanceToStart / DISTANCE_THRESHOLD);
  
      // Location type score
      const locationTypeScore = LOCATION_TYPE_SCORES[order.location_type as keyof typeof LOCATION_TYPE_SCORES] || 1.0; // Default to 1.0
  
     // Item type preference
     let itemTypeScore = 0.5; // Default neutral score
     if (order.contains && courier.soft.preferences?.includes(order.contains)) {
       itemTypeScore = 1.0; // Perfect match
     } else if (order.contains && courier.hard.order_restrictions?.includes(order.contains)) {
       return HIGH_COST; // Hard preference violation
     }
    
     // Price score
     const priceScore = order.totalComp ? Math.min(order.totalComp / MAX_PRICE, 1.0) : 1.0; // Default to 1.0 if price is missing

     // Calculate total weighted score
     const totalScore =
       WEIGHTS.area * areaScore +
       WEIGHTS.distance * distanceScore +
       WEIGHTS.location_type * locationTypeScore +
       WEIGHTS.item_type * itemTypeScore +
       WEIGHTS.price * priceScore;
 
     return -totalScore; // negate score for matrix calculation 
  }

  /**
   * Calculates the distance between two locations.
   */
  private calculateDistance(loc1: GeoPosition, loc2: GeoPosition): number {
    if (!loc1 || !loc2) {
      return HIGH_COST; // Return high cost if locations are invalid
    }
    return Math.sqrt(
      Math.pow(loc1.latitude - loc2.latitude, 2) +
      Math.pow(loc1.longitude - loc2.longitude, 2)
    );
  }
}