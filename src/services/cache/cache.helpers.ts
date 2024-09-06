export enum CacheKeys {
  DELIVERY_COURIER_MATCH = 'delivery-courier-match:deliveryId',
  DELIVERY_REJECTED_COURIERS = 'delivery-rejected-couriers:deliveryId',
}

export class CacheHelpers {
  static getDeliveryCourierMatchKey(deliveryId: string) {
    return CacheKeys.DELIVERY_COURIER_MATCH.replace('deliveryId', deliveryId)
  }

  static getDeliveryRejectedCouriersKey(deliveryId: string) {
    return CacheKeys.DELIVERY_REJECTED_COURIERS.replace('deliveryId', deliveryId)
  }
}
