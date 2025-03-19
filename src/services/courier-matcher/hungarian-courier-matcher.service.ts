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
    const deliveries = deliveriesInput.map((input) => ({
      id: input.deliveryId,
      start_location: input.pickupLocation,
      end_location: input.dropoffLocation,
      contains: input.contains || [],
      restaurantTags: input.restaurantTags || [],
    }));

    const couriers = availableCouriers.map((courier) => ({
      id: courier.id,
      location: courier.currentLocation,
      hard: {
        order_restrictions: courier.restrictions || [],
      },
      soft: {
        preferences: courier.preferences || [],
      },
    }));

    const numOrders = deliveries.length;
    const numCouriers = couriers.length;
    const size = Math.max(numOrders, numCouriers);
    const costMatrix = math.ones(size, size).map(() => HIGH_COST) as math.Matrix;

    const calculateDistance = (loc1: GeoPosition, loc2: GeoPosition) => {
      return Math.sqrt(
        Math.pow(loc1.latitude - loc2.latitude, 2) +
          Math.pow(loc1.longitude - loc2.longitude, 2)
      );
    };

    const calculateCompatibility = (order: any, courier: any) => {
      let score = 0;

      // Hard restrictions - return high cost if incompatible
      if (courier.hard?.order_restrictions && order.contains) {
        if (
          courier.hard.order_restrictions.some((restriction: any) =>
            order.contains.includes(restriction)
          )
        ) {
          return HIGH_COST;
        }
      }

      // Soft preferences - add score if compatible
      if (courier.soft?.preferences) {
        if (
          courier.soft.preferences.some((preference: any) =>
            order.restaurantTags.includes(preference)
          )
        ) {
          score += 1;
        }
      }

      // Apply distance factor scores
      const distanceToStart = calculateDistance(
        order.start_location,
        courier.location
      );
      if (distanceToStart > DISTANCE_THRESHOLD) {
        return HIGH_COST; // Set high cost if distance exceeds threshold
      }
      score -= distanceToStart;

      return -score; // Negate score for Hungarian minimizing
    };

    // Fill the cost matrix with compatibility scores
    for (let i = 0; i < numOrders; i++) {
      for (let j = 0; j < numCouriers; j++) {
        costMatrix.subset(
          math.index(i, j),
          calculateCompatibility(deliveries[i], couriers[j])
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
        const distance = calculateDistance(
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
    // Get all available couriers
    const availableCouriers = await this.courierDomainService.findAllAvailable({});
    if (!availableCouriers || availableCouriers.length === 0) {
      return null; // No couriers available
    }
  
    // Transform the delivery input into the required format
    const delivery = {
      id: deliveryInput.deliveryId,
      start_location: deliveryInput.pickupLocation,
      end_location: deliveryInput.dropoffLocation,
      contains: deliveryInput.contains || [],
      restaurantTags: deliveryInput.restaurantTags || [],
    };
  
    const couriers = availableCouriers.map((courier) => ({
      id: courier.id,
      location: courier.currentLocation,
      hard: {
        order_restrictions: courier.restrictions || [],
      },
      soft: {
        preferences: courier.preferences || [],
      },
    }));
  
    const calculateDistance = (loc1: GeoPosition, loc2: GeoPosition) => {
      if (!loc1 || !loc2) {
        return HIGH_COST; // Return high cost if locations are invalid
      }
      return Math.sqrt(
        Math.pow(loc1.latitude - loc2.latitude, 2) +
        Math.pow(loc1.longitude - loc2.longitude, 2)
      );
    };
  
    const calculateCompatibility = (order: any, courier: any) => {
      let score = 0;
  
      // Hard restrictions - return high cost if incompatible
      if (courier.hard?.order_restrictions && order.contains) {
        if (
          courier.hard.order_restrictions.some((restriction: any) =>
            order.contains.includes(restriction)
          )
        ) {
          return HIGH_COST;
        }
      }
  
      // Soft preferences - add score if compatible
      const preferences = courier.soft?.preferences || [];
      const restaurantTags = order.restaurantTags || [];
      if (preferences.some((preference: any) => restaurantTags.includes(preference))) {
        score += 1;
      }
  
      // Apply distance factor scores
      const distanceToStart = calculateDistance(order.start_location, courier.location);
      if (distanceToStart > DISTANCE_THRESHOLD) {
        return HIGH_COST; // Set high cost if distance exceeds threshold
      }
      score -= distanceToStart;
  
      return -score; // Negate score for Hungarian minimizing
    };
  
    // Find the best courier for the delivery
    let bestCourier: any = null;
    let bestScore = HIGH_COST;
  
    for (const courier of couriers) {
      const compatibilityScore = calculateCompatibility(delivery, courier);
      if (compatibilityScore < bestScore) {
        bestScore = compatibilityScore;
        bestCourier = courier;
      }
    }
  
    if (!bestCourier) {
      return null; // No suitable courier found
    }
  
    // Return the result
    return {
      courierId: bestCourier.id,
      deliveryId: delivery.id!,
      distance: calculateDistance(delivery.start_location, bestCourier.location),
    };
  }
}