
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.3.1
 * Query Engine version: 61e140623197a131c2a6189271ffee05a7aa9a59
 */
Prisma.prismaVersion = {
  client: "5.3.1",
  engine: "61e140623197a131c2a6189271ffee05a7aa9a59"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  role: 'role',
  username: 'username',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  text: 'text',
  likes: 'likes',
  likers: 'likers',
  commentableId: 'commentableId',
  commentableType: 'commentableType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  courierId: 'courierId'
};

exports.Prisma.CourierScalarFieldEnum = {
  id: 'id',
  node_uri: 'node_uri',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  status: 'status',
  deliverySetting: 'deliverySetting',
  rejectedOffers: 'rejectedOffers',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  stripeAccountId: 'stripeAccountId',
  stripeAccountStatus: 'stripeAccountStatus'
};

exports.Prisma.EarningScalarFieldEnum = {
  id: 'id',
  total: 'total',
  pending: 'pending',
  received: 'received',
  payoutMethod: 'payoutMethod',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  courierId: 'courierId'
};

exports.Prisma.LocationScalarFieldEnum = {
  id: 'id',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  city: 'city',
  state: 'state',
  street: 'street',
  zipCode: 'zipCode',
  countryCode: 'countryCode',
  stateCode: 'stateCode',
  houseNumber: 'houseNumber',
  longitude: 'longitude',
  latitude: 'latitude',
  formattedAddress: 'formattedAddress',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PartnerScalarFieldEnum = {
  id: 'id',
  name: 'name',
  logo: 'logo',
  phoneNumber: 'phoneNumber',
  webhookUrl: 'webhookUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.DeliveryQuoteScalarFieldEnum = {
  id: 'id',
  quote: 'quote',
  quoteRangeFrom: 'quoteRangeFrom',
  quoteRangeTo: 'quoteRangeTo',
  feePercentage: 'feePercentage',
  currency: 'currency',
  duration: 'duration',
  distance: 'distance',
  distanceUnit: 'distanceUnit',
  pickupPhoneNumber: 'pickupPhoneNumber',
  pickupName: 'pickupName',
  dropoffPhoneNumber: 'dropoffPhoneNumber',
  dropoffName: 'dropoffName',
  expiresAt: 'expiresAt',
  pickupReadyAt: 'pickupReadyAt',
  pickupDeadlineAt: 'pickupDeadlineAt',
  dropoffReadyAt: 'dropoffReadyAt',
  dropoffEta: 'dropoffEta',
  dropoffDeadlineAt: 'dropoffDeadlineAt',
  orderTotalValue: 'orderTotalValue',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  pickupLocationId: 'pickupLocationId',
  dropoffLocationId: 'dropoffLocationId',
  partnerId: 'partnerId',
  deliveryId: 'deliveryId'
};

exports.Prisma.DeliveryScalarFieldEnum = {
  id: 'id',
  pickupName: 'pickupName',
  pickupPhoneNumber: 'pickupPhoneNumber',
  pickupBusinessName: 'pickupBusinessName',
  pickupNotes: 'pickupNotes',
  pickupVerification: 'pickupVerification',
  pickupLocationId: 'pickupLocationId',
  pickupReadyAt: 'pickupReadyAt',
  pickupDeadlineAt: 'pickupDeadlineAt',
  dropoffName: 'dropoffName',
  dropoffPhoneNumber: 'dropoffPhoneNumber',
  dropoffBusinessName: 'dropoffBusinessName',
  dropoffNotes: 'dropoffNotes',
  dropoffSellerNotes: 'dropoffSellerNotes',
  dropoffVerification: 'dropoffVerification',
  dropoffReadyAt: 'dropoffReadyAt',
  dropoffEta: 'dropoffEta',
  dropoffDeadlineAt: 'dropoffDeadlineAt',
  deliverableAction: 'deliverableAction',
  undeliverableAction: 'undeliverableAction',
  undeliverableReason: 'undeliverableReason',
  dropoffLocationId: 'dropoffLocationId',
  deliveryTypes: 'deliveryTypes',
  requiresDropoffSignature: 'requiresDropoffSignature',
  requiresId: 'requiresId',
  orderReference: 'orderReference',
  orderTotalValue: 'orderTotalValue',
  orderItems: 'orderItems',
  status: 'status',
  customerNotes: 'customerNotes',
  currencyCode: 'currencyCode',
  pickupTypes: 'pickupTypes',
  imageType: 'imageType',
  imageName: 'imageName',
  imageData: 'imageData',
  idempotencyKey: 'idempotencyKey',
  externalStoreId: 'externalStoreId',
  returnVerification: 'returnVerification',
  externalUserInfo: 'externalUserInfo',
  externalId: 'externalId',
  courierId: 'courierId',
  partnerId: 'partnerId',
  deliveryQuoteId: 'deliveryQuoteId',
  totalCost: 'totalCost',
  fee: 'fee',
  feePercentage: 'feePercentage',
  pay: 'pay',
  tips: 'tips',
  totalCompensation: 'totalCompensation',
  rejectedByCouriers: 'rejectedByCouriers',
  matchedCourierId: 'matchedCourierId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.DeliveryEventScalarFieldEnum = {
  id: 'id',
  transitionSuccessful: 'transitionSuccessful',
  type: 'type',
  actor: 'actor',
  eventSource: 'eventSource',
  oldStatus: 'oldStatus',
  newStatus: 'newStatus',
  message: 'message',
  deliveryId: 'deliveryId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LocationNoteScalarFieldEnum = {
  id: 'id',
  note: 'note',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  actor: 'actor',
  locationId: 'locationId',
  deliveryId: 'deliveryId',
  courierId: 'courierId'
};

exports.Prisma.LocationNoteReactionScalarFieldEnum = {
  id: 'id',
  reaction: 'reaction',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  locationNoteId: 'locationNoteId',
  courierId: 'courierId'
};

exports.Prisma.CourierSettingScalarFieldEnum = {
  id: 'id',
  vehicleType: 'vehicleType',
  preferredAreas: 'preferredAreas',
  shiftAvailability: 'shiftAvailability',
  deliveryPreferences: 'deliveryPreferences',
  foodPreferences: 'foodPreferences',
  earningGoals: 'earningGoals',
  deliverySpeed: 'deliverySpeed',
  restaurantTypes: 'restaurantTypes',
  cuisineTypes: 'cuisineTypes',
  preferredRestaurantPartners: 'preferredRestaurantPartners',
  dietaryRestrictions: 'dietaryRestrictions',
  payRate: 'payRate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  courierId: 'courierId'
};

exports.Prisma.PayoutScalarFieldEnum = {
  id: 'id',
  amount: 'amount',
  arrivalDate: 'arrivalDate',
  description: 'description',
  statementDescriptor: 'statementDescriptor',
  status: 'status',
  paymentId: 'paymentId',
  courierId: 'courierId'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  capturedAt: 'capturedAt',
  canceledAt: 'canceledAt',
  amount: 'amount',
  status: 'status',
  deliveryId: 'deliveryId',
  provider: 'provider'
};

exports.Prisma.StripePaymentDataScalarFieldEnum = {
  id: 'id',
  paymentIntentId: 'paymentIntentId',
  paymentMethodId: 'paymentMethodId',
  latestChargeId: 'latestChargeId',
  paymentId: 'paymentId'
};

exports.Prisma.TransferScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  transferId: 'transferId',
  amount: 'amount',
  amountReversed: 'amountReversed',
  destination: 'destination',
  destinationPayment: 'destinationPayment',
  reversed: 'reversed',
  paymentId: 'paymentId',
  courierId: 'courierId'
};

exports.Prisma.RefundScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  refundId: 'refundId',
  amount: 'amount',
  description: 'description',
  reason: 'reason',
  status: 'status',
  paymentId: 'paymentId'
};

exports.Prisma.ConfigScalarFieldEnum = {
  key: 'key',
  type: 'type',
  value: 'value'
};

exports.Prisma.Spatial_ref_sysScalarFieldEnum = {
  srid: 'srid',
  auth_name: 'auth_name',
  auth_srid: 'auth_srid',
  srtext: 'srtext',
  proj4text: 'proj4text'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.UserOrderByRelevanceFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  username: 'username'
};

exports.Prisma.CommentOrderByRelevanceFieldEnum = {
  id: 'id',
  text: 'text',
  likers: 'likers',
  commentableId: 'commentableId',
  commentableType: 'commentableType',
  courierId: 'courierId'
};

exports.Prisma.CourierOrderByRelevanceFieldEnum = {
  id: 'id',
  node_uri: 'node_uri',
  firstName: 'firstName',
  lastName: 'lastName',
  phoneNumber: 'phoneNumber',
  rejectedOffers: 'rejectedOffers',
  userId: 'userId',
  stripeAccountId: 'stripeAccountId'
};

exports.Prisma.EarningOrderByRelevanceFieldEnum = {
  id: 'id',
  payoutMethod: 'payoutMethod',
  courierId: 'courierId'
};

exports.Prisma.LocationOrderByRelevanceFieldEnum = {
  id: 'id',
  addressLine1: 'addressLine1',
  addressLine2: 'addressLine2',
  city: 'city',
  state: 'state',
  street: 'street',
  zipCode: 'zipCode',
  stateCode: 'stateCode',
  houseNumber: 'houseNumber',
  formattedAddress: 'formattedAddress'
};

exports.Prisma.PartnerOrderByRelevanceFieldEnum = {
  id: 'id',
  name: 'name',
  logo: 'logo',
  phoneNumber: 'phoneNumber',
  webhookUrl: 'webhookUrl',
  userId: 'userId'
};

exports.Prisma.DeliveryQuoteOrderByRelevanceFieldEnum = {
  id: 'id',
  currency: 'currency',
  pickupPhoneNumber: 'pickupPhoneNumber',
  pickupName: 'pickupName',
  dropoffPhoneNumber: 'dropoffPhoneNumber',
  dropoffName: 'dropoffName',
  pickupLocationId: 'pickupLocationId',
  dropoffLocationId: 'dropoffLocationId',
  partnerId: 'partnerId',
  deliveryId: 'deliveryId'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.DeliveryOrderByRelevanceFieldEnum = {
  id: 'id',
  pickupName: 'pickupName',
  pickupPhoneNumber: 'pickupPhoneNumber',
  pickupBusinessName: 'pickupBusinessName',
  pickupNotes: 'pickupNotes',
  pickupLocationId: 'pickupLocationId',
  dropoffName: 'dropoffName',
  dropoffPhoneNumber: 'dropoffPhoneNumber',
  dropoffBusinessName: 'dropoffBusinessName',
  dropoffNotes: 'dropoffNotes',
  dropoffSellerNotes: 'dropoffSellerNotes',
  undeliverableReason: 'undeliverableReason',
  dropoffLocationId: 'dropoffLocationId',
  deliveryTypes: 'deliveryTypes',
  orderReference: 'orderReference',
  customerNotes: 'customerNotes',
  currencyCode: 'currencyCode',
  pickupTypes: 'pickupTypes',
  imageType: 'imageType',
  imageName: 'imageName',
  idempotencyKey: 'idempotencyKey',
  externalStoreId: 'externalStoreId',
  externalId: 'externalId',
  courierId: 'courierId',
  partnerId: 'partnerId',
  deliveryQuoteId: 'deliveryQuoteId',
  rejectedByCouriers: 'rejectedByCouriers',
  matchedCourierId: 'matchedCourierId'
};

exports.Prisma.DeliveryEventOrderByRelevanceFieldEnum = {
  id: 'id',
  message: 'message',
  deliveryId: 'deliveryId'
};

exports.Prisma.LocationNoteOrderByRelevanceFieldEnum = {
  id: 'id',
  note: 'note',
  locationId: 'locationId',
  deliveryId: 'deliveryId',
  courierId: 'courierId'
};

exports.Prisma.LocationNoteReactionOrderByRelevanceFieldEnum = {
  id: 'id',
  locationNoteId: 'locationNoteId',
  courierId: 'courierId'
};

exports.Prisma.CourierSettingOrderByRelevanceFieldEnum = {
  id: 'id',
  preferredAreas: 'preferredAreas',
  deliveryPreferences: 'deliveryPreferences',
  foodPreferences: 'foodPreferences',
  restaurantTypes: 'restaurantTypes',
  cuisineTypes: 'cuisineTypes',
  preferredRestaurantPartners: 'preferredRestaurantPartners',
  dietaryRestrictions: 'dietaryRestrictions',
  courierId: 'courierId'
};

exports.Prisma.PayoutOrderByRelevanceFieldEnum = {
  id: 'id',
  description: 'description',
  statementDescriptor: 'statementDescriptor',
  paymentId: 'paymentId',
  courierId: 'courierId'
};

exports.Prisma.PaymentOrderByRelevanceFieldEnum = {
  id: 'id',
  deliveryId: 'deliveryId'
};

exports.Prisma.StripePaymentDataOrderByRelevanceFieldEnum = {
  id: 'id',
  paymentIntentId: 'paymentIntentId',
  paymentMethodId: 'paymentMethodId',
  latestChargeId: 'latestChargeId',
  paymentId: 'paymentId'
};

exports.Prisma.TransferOrderByRelevanceFieldEnum = {
  id: 'id',
  transferId: 'transferId',
  destination: 'destination',
  destinationPayment: 'destinationPayment',
  paymentId: 'paymentId',
  courierId: 'courierId'
};

exports.Prisma.RefundOrderByRelevanceFieldEnum = {
  id: 'id',
  refundId: 'refundId',
  description: 'description',
  paymentId: 'paymentId'
};

exports.Prisma.ConfigOrderByRelevanceFieldEnum = {
  key: 'key',
  type: 'type',
  value: 'value'
};

exports.Prisma.spatial_ref_sysOrderByRelevanceFieldEnum = {
  auth_name: 'auth_name',
  srtext: 'srtext',
  proj4text: 'proj4text'
};
exports.EnumUserRole = exports.$Enums.EnumUserRole = {
  ADMIN: 'ADMIN',
  COURIER: 'COURIER',
  PARTNER: 'PARTNER'
};

exports.EnumCourierStatus = exports.$Enums.EnumCourierStatus = {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE',
  LAST_CALL: 'LAST_CALL'
};

exports.EnumCourierDeliverySetting = exports.$Enums.EnumCourierDeliverySetting = {
  AUTO_ACCEPT: 'AUTO_ACCEPT',
  AUTO_REJECT: 'AUTO_REJECT',
  MANUAL: 'MANUAL',
  NONE: 'NONE'
};

exports.EnumStripeAccountStatus = exports.$Enums.EnumStripeAccountStatus = {
  COMPLETE: 'COMPLETE',
  ENABLED: 'ENABLED',
  PENDING: 'PENDING',
  REJECTED: 'REJECTED',
  RESTRICTED: 'RESTRICTED',
  ATTENTION_NEEDED: 'ATTENTION_NEEDED'
};

exports.EnumCountryCode = exports.$Enums.EnumCountryCode = {
  US: 'US'
};

exports.EnumDistanceUnit = exports.$Enums.EnumDistanceUnit = {
  KILOMETERS: 'KILOMETERS',
  MILES: 'MILES'
};

exports.EnumDeliverableAction = exports.$Enums.EnumDeliverableAction = {
  MEET_AT_DOOR: 'MEET_AT_DOOR',
  LEAVE_AT_DOOR: 'LEAVE_AT_DOOR'
};

exports.EnumUndeliverableAction = exports.$Enums.EnumUndeliverableAction = {
  LEAVE_AT_DOOR: 'LEAVE_AT_DOOR',
  RETURN: 'RETURN',
  DISCARD: 'DISCARD'
};

exports.EnumDeliveryStatus = exports.$Enums.EnumDeliveryStatus = {
  CREATED: 'CREATED',
  ASSIGNING_COURIER: 'ASSIGNING_COURIER',
  ACCEPTED: 'ACCEPTED',
  DISPATCHED: 'DISPATCHED',
  PICKED_UP: 'PICKED_UP',
  ON_THE_WAY: 'ON_THE_WAY',
  DROPPED_OFF: 'DROPPED_OFF',
  CANCELED: 'CANCELED',
  FAILED: 'FAILED'
};

exports.EnumDeliveryEventType = exports.$Enums.EnumDeliveryEventType = {
  CREATED: 'CREATED',
  CONFIRMED: 'CONFIRMED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  DISPATCHED: 'DISPATCHED',
  CANCELED: 'CANCELED',
  FULFILLED: 'FULFILLED',
  DROPPED_OFF: 'DROPPED_OFF',
  PICKED_UP: 'PICKED_UP',
  ON_THE_WAY: 'ON_THE_WAY',
  FAILED: 'FAILED'
};

exports.EnumEventActor = exports.$Enums.EnumEventActor = {
  COURIER: 'COURIER',
  ADMIN: 'ADMIN',
  PARTNER: 'PARTNER'
};

exports.EnumDeliveryEventSource = exports.$Enums.EnumDeliveryEventSource = {
  OPENCOURIER: 'OPENCOURIER',
  PARTNER_APP: 'PARTNER_APP'
};

exports.EnumLocationNoteActor = exports.$Enums.EnumLocationNoteActor = {
  COURIER: 'COURIER',
  ADMIN: 'ADMIN',
  PARTNER: 'PARTNER'
};

exports.EnumLocationNoteReactionType = exports.$Enums.EnumLocationNoteReactionType = {
  UPVOTE: 'UPVOTE',
  DOWNVOTE: 'DOWNVOTE'
};

exports.EnumSettingVehicleType = exports.$Enums.EnumSettingVehicleType = {
  BICYCLE: 'BICYCLE',
  MOTORCYCLE: 'MOTORCYCLE',
  CAR: 'CAR',
  SCOOTER: 'SCOOTER',
  ON_FOOT: 'ON_FOOT'
};

exports.EnumSettingDeliverySpeed = exports.$Enums.EnumSettingDeliverySpeed = {
  REGULAR: 'REGULAR',
  RUSH: 'RUSH'
};

exports.EnumPayoutStatus = exports.$Enums.EnumPayoutStatus = {
  PAID: 'PAID',
  PENDING: 'PENDING',
  IN_TRANSIT: 'IN_TRANSIT',
  CANCELED: 'CANCELED',
  FAILED: 'FAILED'
};

exports.EnumPaymentStatus = exports.$Enums.EnumPaymentStatus = {
  CANCELED: 'CANCELED',
  REQUIRES_CONFIRMATION: 'REQUIRES_CONFIRMATION',
  REQUIRES_CAPTURE: 'REQUIRES_CAPTURE',
  PROCESSING: 'PROCESSING',
  REQUIRES_ACTION: 'REQUIRES_ACTION',
  REQUIRES_PAYMENT_METHOD: 'REQUIRES_PAYMENT_METHOD',
  SUCCEEDED: 'SUCCEEDED'
};

exports.EnumPaymentProvider = exports.$Enums.EnumPaymentProvider = {
  STRIPE: 'STRIPE'
};

exports.EnumRefundReason = exports.$Enums.EnumRefundReason = {
  DUPLICATE: 'DUPLICATE',
  FRAUDULENT: 'FRAUDULENT',
  REQUESTED_BY_CUSTOMER: 'REQUESTED_BY_CUSTOMER',
  EXPIRED_UNCAPTURED_CHARGE: 'EXPIRED_UNCAPTURED_CHARGE'
};

exports.EnumRefundStatus = exports.$Enums.EnumRefundStatus = {
  PENDING: 'PENDING',
  REQUIRES_ACTION: 'REQUIRES_ACTION',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
  CANCELED: 'CANCELED'
};

exports.Prisma.ModelName = {
  User: 'User',
  Comment: 'Comment',
  Courier: 'Courier',
  Earning: 'Earning',
  Location: 'Location',
  Partner: 'Partner',
  DeliveryQuote: 'DeliveryQuote',
  Delivery: 'Delivery',
  DeliveryEvent: 'DeliveryEvent',
  LocationNote: 'LocationNote',
  LocationNoteReaction: 'LocationNoteReaction',
  CourierSetting: 'CourierSetting',
  Payout: 'Payout',
  Payment: 'Payment',
  StripePaymentData: 'StripePaymentData',
  Transfer: 'Transfer',
  Refund: 'Refund',
  Config: 'Config',
  spatial_ref_sys: 'spatial_ref_sys'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "types",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/wilmer/courier-backend/prisma/types",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../.env",
    "schemaEnvPath": "../../.env"
  },
  "relativePath": "..",
  "clientVersion": "5.3.1",
  "engineVersion": "61e140623197a131c2a6189271ffee05a7aa9a59",
  "datasourceNames": [
    "postgres"
  ],
  "activeProvider": "postgresql",
  "postinstall": false,
  "inlineDatasources": {
    "postgres": {
      "url": {
        "fromEnvVar": "DB_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgICAgICAgID0gInByaXNtYS1jbGllbnQtanMiCiAgcHJldmlld0ZlYXR1cmVzID0gWyJmdWxsVGV4dFNlYXJjaCIsICJwb3N0Z3Jlc3FsRXh0ZW5zaW9ucyIsICJ0cmFjaW5nIl0KICBlbmdpbmVUeXBlICAgICAgPSAibGlicmFyeSIKICBvdXRwdXQgICAgICAgICAgPSAiLi9jbGllbnQiCn0KCmdlbmVyYXRvciB0eXBlcyB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuL3R5cGVzIgp9CgpkYXRhc291cmNlIHBvc3RncmVzIHsKICBwcm92aWRlciAgID0gInBvc3RncmVzcWwiCiAgdXJsICAgICAgICA9IGVudigiREJfVVJMIikKICBleHRlbnNpb25zID0gW3Bvc3RnaXMoKV0KfQoKbW9kZWwgVXNlciB7CiAgaWQgICAgICAgU3RyaW5nICAgICAgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBlbWFpbCAgICBTdHJpbmc/ICAgICAgICBAdW5pcXVlCiAgcGFzc3dvcmQgU3RyaW5nPwogIHJvbGUgICAgIEVudW1Vc2VyUm9sZVtdCgogIHVzZXJuYW1lIFN0cmluZz8gQHVuaXF1ZQoKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEB1cGRhdGVkQXQKCiAgY291cmllciBDb3VyaWVyPwogIHBhcnRuZXIgUGFydG5lcj8KfQoKbW9kZWwgQ29tbWVudCB7CiAgaWQgICAgICAgICAgICAgIFN0cmluZyAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgdGV4dCAgICAgICAgICAgIFN0cmluZz8gIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBsaWtlcyAgICAgICAgICAgSW50PyAgICAgQGRlZmF1bHQoMCkKICBsaWtlcnMgICAgICAgICAgU3RyaW5nW10gQGRlZmF1bHQoW10pCiAgY29tbWVudGFibGVJZCAgIFN0cmluZwogIGNvbW1lbnRhYmxlVHlwZSBTdHJpbmcgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCgogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAoKICBjb3VyaWVySWQgU3RyaW5nPwogIGNvdXJpZXJzICBDb3VyaWVyPyBAcmVsYXRpb24oZmllbGRzOiBbY291cmllcklkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCn0KCm1vZGVsIENvdXJpZXIgewogIGlkICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgbm9kZV91cmkgICAgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoImh0dHBzOi8vbG9jYWxob3N0IikgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGZpcnN0TmFtZSAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBsYXN0TmFtZSAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgcGhvbmVOdW1iZXIgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHVuaXF1ZSBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgc3RhdHVzICAgICAgICAgIEVudW1Db3VyaWVyU3RhdHVzICAgICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoT0ZGTElORSkKICBkZWxpdmVyeVNldHRpbmcgRW51bUNvdXJpZXJEZWxpdmVyeVNldHRpbmcgICAgICAgICAgICBAZGVmYXVsdChNQU5VQUwpCiAgY3VycmVudExvY2F0aW9uIFVuc3VwcG9ydGVkKCJnZW9tZXRyeShQb2ludCwgNDMyNikiKT8KICByZWplY3RlZE9mZmVycyAgU3RyaW5nW10gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdChbXSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0CgogIHVzZXJJZCBTdHJpbmcgQHVuaXF1ZQogIHVzZXIgICBVc2VyICAgQHJlbGF0aW9uKGZpZWxkczogW3VzZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBTZXROdWxsKQoKICBzdHJpcGVBY2NvdW50SWQgICAgIFN0cmluZz8gICAgICAgICAgICAgICAgIEB1bmlxdWUKICBzdHJpcGVBY2NvdW50U3RhdHVzIEVudW1TdHJpcGVBY2NvdW50U3RhdHVzIEBkZWZhdWx0KFJFSkVDVEVEKQoKICBjb21tZW50cyAgICAgICAgICAgICAgQ29tbWVudFtdCiAgZWFybmluZ3MgICAgICAgICAgICAgIEVhcm5pbmdbXQogIGRlbGl2ZXJpZXMgICAgICAgICAgICBEZWxpdmVyeVtdCiAgc2V0dGluZ3MgICAgICAgICAgICAgIENvdXJpZXJTZXR0aW5nPwogIFBheW91dCAgICAgICAgICAgICAgICBQYXlvdXRbXQogIFRyYW5zZmVyICAgICAgICAgICAgICBUcmFuc2ZlcltdCiAgbG9jYXRpb25Ob3RlcyAgICAgICAgIExvY2F0aW9uTm90ZVtdCiAgbG9jYXRpb25Ob3RlUmVhY3Rpb25zIExvY2F0aW9uTm90ZVJlYWN0aW9uW10KCiAgLy8gdGhlIGluZGV4IGZvciB0aGF0IGNvbHVtbgogIEBAaW5kZXgoW2N1cnJlbnRMb2NhdGlvbl0sIG5hbWU6ICJjb3VyaWVyX2xvY2F0aW9uX2lkeCIsIHR5cGU6IEdpc3QpCn0KCm1vZGVsIEVhcm5pbmcgewogIGlkICAgICAgICAgICBTdHJpbmcgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgdG90YWwgICAgICAgIEludAogIHBlbmRpbmcgICAgICBJbnQKICByZWNlaXZlZCAgICAgSW50CiAgcGF5b3V0TWV0aG9kIFN0cmluZz8gQHBvc3RncmVzLlZhckNoYXIoMjU1KQoKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEB1cGRhdGVkQXQKCiAgY291cmllcklkIFN0cmluZz8KICBjb3VyaWVycyAgQ291cmllcj8gQHJlbGF0aW9uKGZpZWxkczogW2NvdXJpZXJJZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlKQp9Cgptb2RlbCBMb2NhdGlvbiB7CiAgaWQgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBhZGRyZXNzTGluZTEgICAgIFN0cmluZz8gICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgYWRkcmVzc0xpbmUyICAgICBTdHJpbmc/ICAgICAgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGNpdHkgICAgICAgICAgICAgU3RyaW5nPyAgICAgICAgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBzdGF0ZSAgICAgICAgICAgIFN0cmluZz8gICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgc3RyZWV0ICAgICAgICAgICBTdHJpbmc/ICAgICAgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIHppcENvZGUgICAgICAgICAgU3RyaW5nPyAgICAgICAgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBjb3VudHJ5Q29kZSAgICAgIEVudW1Db3VudHJ5Q29kZSBAZGVmYXVsdChVUykKICBzdGF0ZUNvZGUgICAgICAgIFN0cmluZz8gICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgaG91c2VOdW1iZXIgICAgICBTdHJpbmc/ICAgICAgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGxvbmdpdHVkZSAgICAgICAgRmxvYXQKICBsYXRpdHVkZSAgICAgICAgIEZsb2F0CiAgZm9ybWF0dGVkQWRkcmVzcyBTdHJpbmc/ICAgICAgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQoKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEB1cGRhdGVkQXQKCiAgbG9jYXRpb25Ob3RlcyBMb2NhdGlvbk5vdGVbXQoKICBwaWNrdXBEZWxpdmVyeSAgRGVsaXZlcnlbXSBAcmVsYXRpb24obmFtZTogInBpY2t1cERlbGl2ZXJ5IikKICBkcm9wb2ZmRGVsaXZlcnkgRGVsaXZlcnlbXSBAcmVsYXRpb24obmFtZTogImRyb3BvZmZEZWxpdmVyeSIpCgogIHBpY2t1cERlbGl2ZXJ5UXVvdGVzICBEZWxpdmVyeVF1b3RlW10gQHJlbGF0aW9uKG5hbWU6ICJwaWNrdXBEZWxpdmVyeVF1b3RlcyIpCiAgZHJvcG9mZkRlbGl2ZXJ5UXVvdGVzIERlbGl2ZXJ5UXVvdGVbXSBAcmVsYXRpb24obmFtZTogImRyb3BvZmZEZWxpdmVyeVF1b3RlcyIpCn0KCm1vZGVsIFBhcnRuZXIgewogIGlkICAgICAgICAgIFN0cmluZyAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBuYW1lICAgICAgICBTdHJpbmcgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBsb2dvICAgICAgICBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBwaG9uZU51bWJlciBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICB3ZWJob29rVXJsICBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0CgogIGRlbGl2ZXJpZXMgICAgIERlbGl2ZXJ5W10KICBkZWxpdmVyeVF1b3RlcyBEZWxpdmVyeVF1b3RlW10KCiAgdXNlcklkIFN0cmluZz8gQHVuaXF1ZQogIHVzZXIgICBVc2VyPyAgIEByZWxhdGlvbihmaWVsZHM6IFt1c2VySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogU2V0TnVsbCkKfQoKbW9kZWwgRGVsaXZlcnlRdW90ZSB7CiAgaWQgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIHF1b3RlICAgICAgICAgIEZsb2F0PwogIHF1b3RlUmFuZ2VGcm9tIEZsb2F0CiAgcXVvdGVSYW5nZVRvICAgRmxvYXQKICBmZWVQZXJjZW50YWdlICBGbG9hdCAgICAgICAgICAgIEBkZWZhdWx0KDApCiAgY3VycmVuY3kgICAgICAgU3RyaW5nICAgICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgZHVyYXRpb24gICAgICAgSW50CiAgZGlzdGFuY2UgICAgICAgRmxvYXQKICBkaXN0YW5jZVVuaXQgICBFbnVtRGlzdGFuY2VVbml0IEBkZWZhdWx0KE1JTEVTKQoKICBwaWNrdXBQaG9uZU51bWJlciBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBwaWNrdXBOYW1lICAgICAgICBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKCiAgZHJvcG9mZlBob25lTnVtYmVyIFN0cmluZz8gQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGRyb3BvZmZOYW1lICAgICAgICBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKCiAgZXhwaXJlc0F0IERhdGVUaW1lPwoKICBwaWNrdXBSZWFkeUF0ICAgIERhdGVUaW1lPwogIHBpY2t1cERlYWRsaW5lQXQgRGF0ZVRpbWU/CgogIGRyb3BvZmZSZWFkeUF0ICAgIERhdGVUaW1lPwogIGRyb3BvZmZFdGEgICAgICAgIERhdGVUaW1lPwogIGRyb3BvZmZEZWFkbGluZUF0IERhdGVUaW1lPwoKICBvcmRlclRvdGFsVmFsdWUgRmxvYXQKCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0CgogIHBpY2t1cExvY2F0aW9uSWQgU3RyaW5nCiAgcGlja3VwTG9jYXRpb24gICBMb2NhdGlvbiBAcmVsYXRpb24oZmllbGRzOiBbcGlja3VwTG9jYXRpb25JZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlLCBuYW1lOiAicGlja3VwRGVsaXZlcnlRdW90ZXMiKQoKICBkcm9wb2ZmTG9jYXRpb25JZCBTdHJpbmcKICBkcm9wb2ZmTG9jYXRpb24gICBMb2NhdGlvbiBAcmVsYXRpb24oZmllbGRzOiBbZHJvcG9mZkxvY2F0aW9uSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSwgbmFtZTogImRyb3BvZmZEZWxpdmVyeVF1b3RlcyIpCgogIHBhcnRuZXJJZCBTdHJpbmc/CiAgcGFydG5lcnMgIFBhcnRuZXI/IEByZWxhdGlvbihmaWVsZHM6IFtwYXJ0bmVySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKCiAgZGVsaXZlcnlJZCBTdHJpbmc/CiAgRGVsaXZlcnkgICBEZWxpdmVyeT8KfQoKbW9kZWwgRGVsaXZlcnkgewogIGlkIFN0cmluZyBAaWQgQGRlZmF1bHQoY3VpZCgpKQoKICAvLyBQaWNrdXAgZGF0YQogIHBpY2t1cE5hbWUgICAgICAgICBTdHJpbmcgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIHBpY2t1cFBob25lTnVtYmVyICBTdHJpbmcgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIHBpY2t1cEJ1c2luZXNzTmFtZSBTdHJpbmcgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIHBpY2t1cE5vdGVzICAgICAgICBTdHJpbmc/ICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIHBpY2t1cFZlcmlmaWNhdGlvbiBKc29uPyAgICAgQHBvc3RncmVzLkpzb24KICBwaWNrdXBMb2NhdGlvbklkICAgU3RyaW5nCiAgcGlja3VwUmVhZHlBdCAgICAgIERhdGVUaW1lPyBAcG9zdGdyZXMuVGltZXN0YW1wdHooNikKICBwaWNrdXBEZWFkbGluZUF0ICAgRGF0ZVRpbWU/IEBwb3N0Z3Jlcy5UaW1lc3RhbXB0eig2KQoKICAvLyBEcm9wb2ZmIGRhdGEKICBkcm9wb2ZmTmFtZSAgICAgICAgIFN0cmluZyAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgZHJvcG9mZlBob25lTnVtYmVyICBTdHJpbmcgICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGRyb3BvZmZCdXNpbmVzc05hbWUgU3RyaW5nPyAgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBkcm9wb2ZmTm90ZXMgICAgICAgIFN0cmluZz8gICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgZHJvcG9mZlNlbGxlck5vdGVzICBTdHJpbmc/ICAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGRyb3BvZmZWZXJpZmljYXRpb24gSnNvbj8gICAgIEBwb3N0Z3Jlcy5Kc29uCiAgZHJvcG9mZlJlYWR5QXQgICAgICBEYXRlVGltZT8gQHBvc3RncmVzLlRpbWVzdGFtcHR6KDYpCiAgZHJvcG9mZkV0YSAgICAgICAgICBEYXRlVGltZT8gQHBvc3RncmVzLlRpbWVzdGFtcHR6KDYpCiAgZHJvcG9mZkRlYWRsaW5lQXQgICBEYXRlVGltZT8gQHBvc3RncmVzLlRpbWVzdGFtcHR6KDYpCgogIGRlbGl2ZXJhYmxlQWN0aW9uICAgICAgICBFbnVtRGVsaXZlcmFibGVBY3Rpb24gICAgQGRlZmF1bHQoTUVFVF9BVF9ET09SKQogIHVuZGVsaXZlcmFibGVBY3Rpb24gICAgICBFbnVtVW5kZWxpdmVyYWJsZUFjdGlvbj8KICB1bmRlbGl2ZXJhYmxlUmVhc29uICAgICAgU3RyaW5nPyAgICAgICAgICAgICAgICAgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBkcm9wb2ZmTG9jYXRpb25JZCAgICAgICAgU3RyaW5nCiAgZGVsaXZlcnlUeXBlcyAgICAgICAgICAgIFN0cmluZ1tdICAgICAgICAgICAgICAgICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiKEFSUkFZW106OmNoYXJhY3RlciB2YXJ5aW5nW10pOjpjaGFyYWN0ZXIgdmFyeWluZygyNTUpW10iKSkgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIHJlcXVpcmVzRHJvcG9mZlNpZ25hdHVyZSBCb29sZWFuICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoZmFsc2UpCiAgcmVxdWlyZXNJZCAgICAgICAgICAgICAgIEJvb2xlYW4gICAgICAgICAgICAgICAgICBAZGVmYXVsdChmYWxzZSkKCiAgLy8gT3JkZXIgZGF0YQogIG9yZGVyUmVmZXJlbmNlICBTdHJpbmc/CiAgb3JkZXJUb3RhbFZhbHVlIEludD8KICBvcmRlckl0ZW1zICAgICAgSnNvbj8gICBAcG9zdGdyZXMuSnNvbgoKICAvLyBEZWxpdmVyeSBkYXRhCiAgc3RhdHVzICAgICAgICAgICAgIEVudW1EZWxpdmVyeVN0YXR1cyBAZGVmYXVsdChDUkVBVEVEKQogIGN1c3RvbWVyTm90ZXMgICAgICBTdHJpbmdbXSAgICAgICAgICAgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIihBUlJBWVtdOjpjaGFyYWN0ZXIgdmFyeWluZ1tdKTo6Y2hhcmFjdGVyIHZhcnlpbmcoMjU1KVtdIikpIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBjdXJyZW5jeUNvZGUgICAgICAgU3RyaW5nICAgICAgICAgICAgIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBwaWNrdXBUeXBlcyAgICAgICAgU3RyaW5nW10gICAgICAgICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCIoQVJSQVlbXTo6Y2hhcmFjdGVyIHZhcnlpbmdbXSk6OmNoYXJhY3RlciB2YXJ5aW5nKDI1NSlbXSIpKSBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgaW1hZ2VUeXBlICAgICAgICAgIFN0cmluZz8gICAgICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgaW1hZ2VOYW1lICAgICAgICAgIFN0cmluZz8gICAgICAgICAgICBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgaW1hZ2VEYXRhICAgICAgICAgIEJ5dGVzPwogIGlkZW1wb3RlbmN5S2V5ICAgICBTdHJpbmc/CiAgZXh0ZXJuYWxTdG9yZUlkICAgIFN0cmluZz8KICByZXR1cm5WZXJpZmljYXRpb24gSnNvbj8gICAgICAgICAgICAgIEBwb3N0Z3Jlcy5Kc29uCiAgZXh0ZXJuYWxVc2VySW5mbyAgIEpzb24/CiAgZXh0ZXJuYWxJZCAgICAgICAgIFN0cmluZz8KICBjb3VyaWVySWQgICAgICAgICAgU3RyaW5nPwogIHBhcnRuZXJJZCAgICAgICAgICBTdHJpbmc/CiAgZGVsaXZlcnlRdW90ZUlkICAgIFN0cmluZyAgICAgICAgICAgICBAdW5pcXVlCgogIHRvdGFsQ29zdCAgICAgICAgIEZsb2F0PwogIGZlZSAgICAgICAgICAgICAgIEZsb2F0PwogIGZlZVBlcmNlbnRhZ2UgICAgIEZsb2F0PwogIHBheSAgICAgICAgICAgICAgIEZsb2F0PwogIHRpcHMgICAgICAgICAgICAgIEZsb2F0ICBAZGVmYXVsdCgwKQogIHRvdGFsQ29tcGVuc2F0aW9uIEZsb2F0PwoKICAvLyBEZWxpdmVyeSBtYXRjaGluZyBkYXRhCiAgcmVqZWN0ZWRCeUNvdXJpZXJzIFN0cmluZ1tdIEBkZWZhdWx0KFtdKQogIG1hdGNoZWRDb3VyaWVySWQgICBTdHJpbmc/CgogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAoKICBwaWNrdXBMb2NhdGlvbiAgTG9jYXRpb24/ICAgICBAcmVsYXRpb24oZmllbGRzOiBbcGlja3VwTG9jYXRpb25JZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlLCBuYW1lOiAicGlja3VwRGVsaXZlcnkiKQogIGRyb3BvZmZMb2NhdGlvbiBMb2NhdGlvbj8gICAgIEByZWxhdGlvbihmaWVsZHM6IFtkcm9wb2ZmTG9jYXRpb25JZF0sIHJlZmVyZW5jZXM6IFtpZF0sIG9uRGVsZXRlOiBDYXNjYWRlLCBuYW1lOiAiZHJvcG9mZkRlbGl2ZXJ5IikKICBjb3VyaWVyICAgICAgICAgQ291cmllcj8gICAgICBAcmVsYXRpb24oZmllbGRzOiBbY291cmllcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBwYXJ0bmVyICAgICAgICAgUGFydG5lcj8gICAgICBAcmVsYXRpb24oZmllbGRzOiBbcGFydG5lcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBkZWxpdmVyeSAgICAgICAgRGVsaXZlcnlRdW90ZSBAcmVsYXRpb24oZmllbGRzOiBbZGVsaXZlcnlRdW90ZUlkXSwgcmVmZXJlbmNlczogW2lkXSwgb25EZWxldGU6IENhc2NhZGUpCgogIHBheW1lbnQgICAgICAgUGF5bWVudFtdCiAgZGVsaXZlcnlFdmVudCBEZWxpdmVyeUV2ZW50W10KICBsb2NhdGlvbk5vdGUgIExvY2F0aW9uTm90ZVtdCgogIEBAdW5pcXVlKFtpZGVtcG90ZW5jeUtleSwgcGFydG5lcklkXSkKfQoKbW9kZWwgRGVsaXZlcnlFdmVudCB7CiAgaWQgICAgICAgICAgICAgICAgICAgU3RyaW5nICAgICAgICAgICAgICAgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICB0cmFuc2l0aW9uU3VjY2Vzc2Z1bCBCb29sZWFuCiAgdHlwZSAgICAgICAgICAgICAgICAgRW51bURlbGl2ZXJ5RXZlbnRUeXBlCiAgYWN0b3IgICAgICAgICAgICAgICAgRW51bUV2ZW50QWN0b3IKICBldmVudFNvdXJjZSAgICAgICAgICBFbnVtRGVsaXZlcnlFdmVudFNvdXJjZQogIG9sZFN0YXR1cyAgICAgICAgICAgIEVudW1EZWxpdmVyeVN0YXR1cz8KICBuZXdTdGF0dXMgICAgICAgICAgICBFbnVtRGVsaXZlcnlTdGF0dXM/CiAgbWVzc2FnZSAgICAgICAgICAgICAgU3RyaW5nPwoKICBkZWxpdmVyeSAgIERlbGl2ZXJ5IEByZWxhdGlvbihmaWVsZHM6IFtkZWxpdmVyeUlkXSwgcmVmZXJlbmNlczogW2lkXSkKICBkZWxpdmVyeUlkIFN0cmluZwoKICBjcmVhdGVkQXQgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpCiAgdXBkYXRlZEF0IERhdGVUaW1lIEB1cGRhdGVkQXQKfQoKbW9kZWwgTG9jYXRpb25Ob3RlIHsKICBpZCAgICAgICAgU3RyaW5nICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBub3RlICAgICAgU3RyaW5nPyAgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAoKICBhY3RvciBFbnVtTG9jYXRpb25Ob3RlQWN0b3IKCiAgbG9jYXRpb25JZCBTdHJpbmc/CiAgbG9jYXRpb25zICBMb2NhdGlvbj8gQHJlbGF0aW9uKGZpZWxkczogW2xvY2F0aW9uSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKCiAgZGVsaXZlcnlJZCBTdHJpbmc/CiAgZGVsaXZlcnkgICBEZWxpdmVyeT8gQHJlbGF0aW9uKGZpZWxkczogW2RlbGl2ZXJ5SWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKCiAgY291cmllcklkICAgICBTdHJpbmc/CiAgY291cmllcnMgICAgICBDb3VyaWVyPyAgICAgICAgICAgICAgIEByZWxhdGlvbihmaWVsZHM6IFtjb3VyaWVySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKICBub3RlUmVhY3Rpb25zIExvY2F0aW9uTm90ZVJlYWN0aW9uW10KfQoKbW9kZWwgTG9jYXRpb25Ob3RlUmVhY3Rpb24gewogIGlkICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICAgICAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgcmVhY3Rpb24gIEVudW1Mb2NhdGlvbk5vdGVSZWFjdGlvblR5cGUKICBjcmVhdGVkQXQgRGF0ZVRpbWUgICAgICAgICAgICAgICAgICAgICBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgICAgICAgICAgICAgICAgICAgICBAdXBkYXRlZEF0CgogIGxvY2F0aW9uTm90ZUlkIFN0cmluZwogIGxvY2F0aW9uTm90ZSAgIExvY2F0aW9uTm90ZSBAcmVsYXRpb24oZmllbGRzOiBbbG9jYXRpb25Ob3RlSWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKCiAgY291cmllcklkIFN0cmluZwogIGNvdXJpZXJzICBDb3VyaWVyIEByZWxhdGlvbihmaWVsZHM6IFtjb3VyaWVySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKfQoKbW9kZWwgQ291cmllclNldHRpbmcgewogIGlkICAgICAgICAgICAgICAgICAgICAgICAgICBTdHJpbmcgICAgICAgICAgICAgICAgICAgIEBpZCBAZGVmYXVsdChjdWlkKCkpCiAgZGVsaXZlcnlQb2x5Z29uICAgICAgICAgICAgIFVuc3VwcG9ydGVkKCJnZW9tZXRyeSIpPwogIHZlaGljbGVUeXBlICAgICAgICAgICAgICAgICBFbnVtU2V0dGluZ1ZlaGljbGVUeXBlPwogIHByZWZlcnJlZEFyZWFzICAgICAgICAgICAgICBTdHJpbmdbXSAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCIoQVJSQVlbXTo6Y2hhcmFjdGVyIHZhcnlpbmdbXSk6OmNoYXJhY3RlciB2YXJ5aW5nKDI1NSlbXSIpKSBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgc2hpZnRBdmFpbGFiaWxpdHkgICAgICAgICAgIEpzb24/ICAgICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoIntcInN1bmRheVwiOltdLFwibW9uZGF5XCI6W10sXCJ0dWVzZGF5XCI6W10sXCJ3ZWRuZXNkYXlcIjpbXSxcInRodXJzZGF5XCI6W10sXCJmcmlkYXlcIjpbXSxcInNhdHVyZGF5XCI6W119IikgQHBvc3RncmVzLkpzb24KICBkZWxpdmVyeVByZWZlcmVuY2VzICAgICAgICAgU3RyaW5nW10gICAgICAgICAgICAgICAgICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiKEFSUkFZW106OmNoYXJhY3RlciB2YXJ5aW5nW10pOjpjaGFyYWN0ZXIgdmFyeWluZygyNTUpW10iKSkgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGZvb2RQcmVmZXJlbmNlcyAgICAgICAgICAgICBTdHJpbmdbXSAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCIoQVJSQVlbXTo6Y2hhcmFjdGVyIHZhcnlpbmdbXSk6OmNoYXJhY3RlciB2YXJ5aW5nKDI1NSlbXSIpKSBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgZWFybmluZ0dvYWxzICAgICAgICAgICAgICAgIEpzb24/ICAgICAgICAgICAgICAgICAgICAgQHBvc3RncmVzLkpzb24KICBkZWxpdmVyeVNwZWVkICAgICAgICAgICAgICAgRW51bVNldHRpbmdEZWxpdmVyeVNwZWVkPyBAZGVmYXVsdChSRUdVTEFSKQogIHJlc3RhdXJhbnRUeXBlcyAgICAgICAgICAgICBTdHJpbmdbXSAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCIoQVJSQVlbXTo6Y2hhcmFjdGVyIHZhcnlpbmdbXSk6OmNoYXJhY3RlciB2YXJ5aW5nKDI1NSlbXSIpKSBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgY3Vpc2luZVR5cGVzICAgICAgICAgICAgICAgIFN0cmluZ1tdICAgICAgICAgICAgICAgICAgQGRlZmF1bHQoZGJnZW5lcmF0ZWQoIihBUlJBWVtdOjpjaGFyYWN0ZXIgdmFyeWluZ1tdKTo6Y2hhcmFjdGVyIHZhcnlpbmcoMjU1KVtdIikpIEBwb3N0Z3Jlcy5WYXJDaGFyKDI1NSkKICBwcmVmZXJyZWRSZXN0YXVyYW50UGFydG5lcnMgU3RyaW5nW10gICAgICAgICAgICAgICAgICBAZGVmYXVsdChkYmdlbmVyYXRlZCgiKEFSUkFZW106OmNoYXJhY3RlciB2YXJ5aW5nW10pOjpjaGFyYWN0ZXIgdmFyeWluZygyNTUpW10iKSkgQHBvc3RncmVzLlZhckNoYXIoMjU1KQogIGRpZXRhcnlSZXN0cmljdGlvbnMgICAgICAgICBTdHJpbmdbXSAgICAgICAgICAgICAgICAgIEBkZWZhdWx0KGRiZ2VuZXJhdGVkKCIoQVJSQVlbXTo6Y2hhcmFjdGVyIHZhcnlpbmdbXSk6OmNoYXJhY3RlciB2YXJ5aW5nKDI1NSlbXSIpKSBAcG9zdGdyZXMuVmFyQ2hhcigyNTUpCiAgcGF5UmF0ZSAgICAgICAgICAgICAgICAgICAgIEpzb24/ICAgICAgICAgICAgICAgICAgICAgQHBvc3RncmVzLkpzb24KCiAgY3JlYXRlZEF0IERhdGVUaW1lIEBkZWZhdWx0KG5vdygpKQogIHVwZGF0ZWRBdCBEYXRlVGltZSBAdXBkYXRlZEF0CgogIGNvdXJpZXJJZCBTdHJpbmc/ICBAdW5pcXVlCiAgY291cmllcnMgIENvdXJpZXI/IEByZWxhdGlvbihmaWVsZHM6IFtjb3VyaWVySWRdLCByZWZlcmVuY2VzOiBbaWRdLCBvbkRlbGV0ZTogQ2FzY2FkZSkKfQoKbW9kZWwgUGF5b3V0IHsKICBpZCAgICAgICAgICAgICAgICAgIFN0cmluZyAgICAgICAgICAgQGlkIEBkZWZhdWx0KGN1aWQoKSkKICBhbW91bnQgICAgICAgICAgICAgIEludCAvLyBUaGUgYW1vdW50IChpbiBjZW50cykgdGhhdCB0cmFuc2ZlcnMgdG8geW91ciBiYW5rIGFjY291bnQgb3IgZGViaXQgY2FyZC4KICBhcnJpdmFsRGF0ZSAgICAgICAgIERhdGVUaW1lIC8vIERhdGUgdGhhdCB0aGUgcGF5b3V0IHdpbGwgYXJyaXZlIGluIHRoZSBiYW5rLgogIGRlc2NyaXB0aW9uICAgICAgICAgU3RyaW5nPyAvLyBBbiBhcmJpdHJhcnkgc3RyaW5nIGF0dGFjaGVkIHRvIHRoZSBvYmplY3QuCiAgc3RhdGVtZW50RGVzY3JpcHRvciBTdHJpbmc/IC8vIEV4dHJhIGluZm9ybWF0aW9uIGFib3V0IGEgcGF5b3V0IGZvciB0aGUgYmFuayBzdGF0ZW1lbnQuCiAgc3RhdHVzICAgICAgICAgICAgICBFbnVtUGF5b3V0U3RhdHVzIC8vIEN1cnJlbnQgc3RhdHVzIG9mIHRoZSBwYXlvdXQuCgogIHBheW1lbnQgICBQYXltZW50IEByZWxhdGlvbihmaWVsZHM6IFtwYXltZW50SWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIHBheW1lbnRJZCBTdHJpbmcKCiAgY291cmllciAgIENvdXJpZXI/IEByZWxhdGlvbihmaWVsZHM6IFtjb3VyaWVySWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIGNvdXJpZXJJZCBTdHJpbmc/Cn0KCm1vZGVsIFBheW1lbnQgewogIGlkIFN0cmluZyBAaWQgQGRlZmF1bHQoY3VpZCgpKQoKICBjcmVhdGVkQXQgIERhdGVUaW1lICBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgIERhdGVUaW1lICBAdXBkYXRlZEF0CiAgY2FwdHVyZWRBdCBEYXRlVGltZT8KICBjYW5jZWxlZEF0IERhdGVUaW1lPwoKICBhbW91bnQgICAgIERlY2ltYWwKICBzdGF0dXMgICAgIEVudW1QYXltZW50U3RhdHVzICAgQGRlZmF1bHQoUkVRVUlSRVNfQ09ORklSTUFUSU9OKQogIGRlbGl2ZXJ5ICAgRGVsaXZlcnkgICAgICAgICAgICBAcmVsYXRpb24oZmllbGRzOiBbZGVsaXZlcnlJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgZGVsaXZlcnlJZCBTdHJpbmcKICBwcm92aWRlciAgIEVudW1QYXltZW50UHJvdmlkZXIgQGRlZmF1bHQoU1RSSVBFKQoKICB0cmFuc2ZlcnMgIFRyYW5zZmVyW10KICByZWZ1bmRzICAgIFJlZnVuZFtdCiAgcGF5b3V0cyAgICBQYXlvdXRbXQogIHN0cmlwZURhdGEgU3RyaXBlUGF5bWVudERhdGE/Cn0KCm1vZGVsIFN0cmlwZVBheW1lbnREYXRhIHsKICBpZCAgICAgICAgICAgICAgU3RyaW5nICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIHBheW1lbnRJbnRlbnRJZCBTdHJpbmcgIEB1bmlxdWUKICBwYXltZW50TWV0aG9kSWQgU3RyaW5nCiAgbGF0ZXN0Q2hhcmdlSWQgIFN0cmluZz8gQHVuaXF1ZQoKICBwYXltZW50ICAgUGF5bWVudD8gQHJlbGF0aW9uKGZpZWxkczogW3BheW1lbnRJZF0sIHJlZmVyZW5jZXM6IFtpZF0pCiAgcGF5bWVudElkIFN0cmluZz8gIEB1bmlxdWUKfQoKbW9kZWwgVHJhbnNmZXIgewogIGlkICAgICAgICBTdHJpbmcgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAoKICB0cmFuc2ZlcklkICAgICAgICAgU3RyaW5nICBAdW5pcXVlIC8vIHRoZSB0cmFuc2ZlciBpZGVudGlmaWVyIGluIHN0cmlwZS4gdHJfMWMuLi4KICBhbW91bnQgICAgICAgICAgICAgSW50CiAgYW1vdW50UmV2ZXJzZWQgICAgIEludCAvLyBBbW91bnQgaW4gY2VudHMgcmV2ZXJzZWQgKGNhbiBiZSBsZXNzIHRoYW4gdGhlIGFtb3VudCBhdHRyaWJ1dGUgb24gdGhlIHRyYW5zZmVyIGlmIGEgcGFydGlhbCByZXZlcnNhbCB3YXMgaXNzdWVkKS4KICBkZXN0aW5hdGlvbiAgICAgICAgU3RyaW5nIC8vIElEIG9mIHRoZSBTdHJpcGUgYWNjb3VudCB0aGUgdHJhbnNmZXIgd2FzIHNlbnQgdG8uCiAgZGVzdGluYXRpb25QYXltZW50IFN0cmluZz8gLy8gVGhlIElEIG9mIHRoZSBzdHJpcGUgcGF5bWVudC4gQ2FuIGJlIHVzZWQgdG8KICByZXZlcnNlZCAgICAgICAgICAgQm9vbGVhbiBAZGVmYXVsdChmYWxzZSkgLy8gV2hldGhlciB0aGUgdHJhbnNmZXIgaGFzIGJlZW4gZnVsbHkgcmV2ZXJzZWQuIElmIHRoZSB0cmFuc2ZlciBpcyBvbmx5IHBhcnRpYWxseSByZXZlcnNlZCwgdGhpcyBhdHRyaWJ1dGUgd2lsbCBzdGlsbCBiZSBmYWxzZS4KCiAgcGF5bWVudCAgIFBheW1lbnQ/IEByZWxhdGlvbihmaWVsZHM6IFtwYXltZW50SWRdLCByZWZlcmVuY2VzOiBbaWRdKQogIHBheW1lbnRJZCBTdHJpbmc/CgogIGNvdXJpZXIgICBDb3VyaWVyPyBAcmVsYXRpb24oZmllbGRzOiBbY291cmllcklkXSwgcmVmZXJlbmNlczogW2lkXSkKICBjb3VyaWVySWQgU3RyaW5nPwp9Cgptb2RlbCBSZWZ1bmQgewogIGlkICAgICAgICBTdHJpbmcgICBAaWQgQGRlZmF1bHQoY3VpZCgpKQogIGNyZWF0ZWRBdCBEYXRlVGltZSBAZGVmYXVsdChub3coKSkKICB1cGRhdGVkQXQgRGF0ZVRpbWUgQHVwZGF0ZWRBdAogIHJlZnVuZElkICBTdHJpbmc/ICBAdW5pcXVlIC8vIFN0cmlwZSByZWZ1bmQgaWQKCiAgYW1vdW50ICAgICAgSW50IC8vIEFtb3VudCwgaW4gY2VudHMuCiAgZGVzY3JpcHRpb24gU3RyaW5nPyAvLyBBbiBhcmJpdHJhcnkgc3RyaW5nIGF0dGFjaGVkIHRvIHRoZSBvYmplY3QuCiAgcmVhc29uICAgICAgRW51bVJlZnVuZFJlYXNvbj8gLy8gUmVhc29uIGZvciB0aGUgcmVmdW5kLgogIHN0YXR1cyAgICAgIEVudW1SZWZ1bmRTdGF0dXM/IC8vIFN0YXR1cyBvZiB0aGUgcmVmdW5kLgoKICBwYXltZW50ICAgUGF5bWVudCBAcmVsYXRpb24oZmllbGRzOiBbcGF5bWVudElkXSwgcmVmZXJlbmNlczogW2lkXSkKICBwYXltZW50SWQgU3RyaW5nCn0KCm1vZGVsIENvbmZpZyB7CiAga2V5ICAgU3RyaW5nIEBpZAogIHR5cGUgIFN0cmluZwogIHZhbHVlIFN0cmluZwp9CgovLy8gVGhpcyB0YWJsZSBjb250YWlucyBjaGVjayBjb25zdHJhaW50cyBhbmQgcmVxdWlyZXMgYWRkaXRpb25hbCBzZXR1cCBmb3IgbWlncmF0aW9ucy4gVmlzaXQgaHR0cHM6Ly9wcmlzLmx5L2QvY2hlY2stY29uc3RyYWludHMgZm9yIG1vcmUgaW5mby4KbW9kZWwgc3BhdGlhbF9yZWZfc3lzIHsKICBzcmlkICAgICAgSW50ICAgICBAaWQKICBhdXRoX25hbWUgU3RyaW5nPyBAcG9zdGdyZXMuVmFyQ2hhcigyNTYpCiAgYXV0aF9zcmlkIEludD8KICBzcnRleHQgICAgU3RyaW5nPyBAcG9zdGdyZXMuVmFyQ2hhcigyMDQ4KQogIHByb2o0dGV4dCBTdHJpbmc/IEBwb3N0Z3Jlcy5WYXJDaGFyKDIwNDgpCn0KCmVudW0gRW51bUNvdXJpZXJEZWxpdmVyeVNldHRpbmcgewogIEFVVE9fQUNDRVBUCiAgQVVUT19SRUpFQ1QKICBNQU5VQUwKICBOT05FCn0KCmVudW0gRW51bUNvdXJpZXJTdGF0dXMgewogIE9OTElORQogIE9GRkxJTkUKICBMQVNUX0NBTEwKfQoKZW51bSBFbnVtRGVsaXZlcnlTdGF0dXMgewogIENSRUFURUQKICBBU1NJR05JTkdfQ09VUklFUgogIEFDQ0VQVEVECiAgRElTUEFUQ0hFRAogIFBJQ0tFRF9VUAogIE9OX1RIRV9XQVkKICBEUk9QUEVEX09GRgogIENBTkNFTEVECiAgRkFJTEVECn0KCmVudW0gRW51bURlbGl2ZXJ5RXZlbnRUeXBlIHsKICBDUkVBVEVECiAgQ09ORklSTUVECiAgQUNDRVBURUQKICBSRUpFQ1RFRAogIERJU1BBVENIRUQKICBDQU5DRUxFRAogIEZVTEZJTExFRAogIERST1BQRURfT0ZGCiAgUElDS0VEX1VQCiAgT05fVEhFX1dBWQogIEZBSUxFRAp9CgplbnVtIEVudW1Db3VudHJ5Q29kZSB7CiAgVVMKfQoKZW51bSBFbnVtRGlzdGFuY2VVbml0IHsKICBLSUxPTUVURVJTCiAgTUlMRVMKfQoKZW51bSBFbnVtU2V0dGluZ0RlbGl2ZXJ5U3BlZWQgewogIFJFR1VMQVIKICBSVVNICn0KCmVudW0gRW51bVNldHRpbmdWZWhpY2xlVHlwZSB7CiAgQklDWUNMRQogIE1PVE9SQ1lDTEUKICBDQVIKICBTQ09PVEVSCiAgT05fRk9PVAp9CgplbnVtIEVudW1Vc2VyUm9sZSB7CiAgQURNSU4KICBDT1VSSUVSCiAgUEFSVE5FUgp9CgplbnVtIEVudW1QYXltZW50U3RhdHVzIHsKICBDQU5DRUxFRAogIFJFUVVJUkVTX0NPTkZJUk1BVElPTiAvLyBkZWZhdWx0IHdoZW4gb3JkZXIgaXMgY3JlYXRlZAogIFJFUVVJUkVTX0NBUFRVUkUgLy8gQWZ0ZXIgYW4gb3JkZXIgaXMgY29uZmlybWVkCiAgUFJPQ0VTU0lORyAvLyBDYXJkIHBheW1lbnRzIGRvIG5vdCBlbnRlciB0aGlzIHN0YXRlLCBzbyBrZWVwaW5nIG91dCBmb3Igbm93LiBJZiB3ZSBhZGQgYmFuayBjaGFyZ2VzLCByZWFkIG9uOiBBZnRlciByZXF1aXJlZCBhY3Rpb25zIGFyZSBoYW5kbGVkLCB0aGUgUGF5bWVudEludGVudCBtb3ZlcyB0byBwcm9jZXNzaW5nIGZvciBhc3luY2hyb25vdXMgcGF5bWVudCBtZXRob2RzLCBzdWNoIGFzIGJhbmsgZGViaXRzLiBUaGVzZSB0eXBlcyBvZiBwYXltZW50IG1ldGhvZHMgY2FuIHRha2UgdXAgdG8gYSBmZXcgZGF5cyB0byBwcm9jZXNzLiBPdGhlciBwYXltZW50IG1ldGhvZHMsIHN1Y2ggYXMgY2FyZHMsIGFyZSBwcm9jZXNzZWQgbW9yZSBxdWlja2x5IGFuZCBkb27igJl0IGdvIGludG8gdGhlIHByb2Nlc3Npbmcgc3RhdHVzLgogIFJFUVVJUkVTX0FDVElPTiAvLyAgdGhlIHBheW1lbnQgcmVxdWlyZXMgYWRkaXRpb25hbCBhY3Rpb25zLCBzdWNoIGFzIGF1dGhlbnRpY2F0aW5nIHdpdGggM0QgU2VjdXJlLCB0aGUgUGF5bWVudEludGVudCBoYXMgYSBzdGF0dXMgb2YgcmVxdWlyZXNfYWN0aW9uMS4KICBSRVFVSVJFU19QQVlNRU5UX01FVEhPRCAvLyBJZiB0aGUgcGF5bWVudCBhdHRlbXB0IGZhaWxzIChmb3IgZXhhbXBsZSBkdWUgdG8gYSBkZWNsaW5lKSwgdGhlIFBheW1lbnRJbnRlbnTigJlzIHN0YXR1cyByZXR1cm5zIHRvIHJlcXVpcmVzX3BheW1lbnRfbWV0aG9kIHNvIHRoYXQgdGhlIHBheW1lbnQgY2FuIGJlIHJldHJpZWQuCiAgU1VDQ0VFREVECn0KCmVudW0gRW51bVJlZnVuZFJlYXNvbiB7CiAgRFVQTElDQVRFCiAgRlJBVURVTEVOVAogIFJFUVVFU1RFRF9CWV9DVVNUT01FUgogIEVYUElSRURfVU5DQVBUVVJFRF9DSEFSR0UKfQoKZW51bSBFbnVtUmVmdW5kU3RhdHVzIHsKICBQRU5ESU5HCiAgUkVRVUlSRVNfQUNUSU9OCiAgU1VDQ0VFREVECiAgRkFJTEVECiAgQ0FOQ0VMRUQKfQoKZW51bSBFbnVtUGF5b3V0U3RhdHVzIHsKICBQQUlECiAgUEVORElORwogIElOX1RSQU5TSVQKICBDQU5DRUxFRAogIEZBSUxFRAp9CgplbnVtIEVudW1TdHJpcGVBY2NvdW50U3RhdHVzIHsKICBDT01QTEVURQogIEVOQUJMRUQKICBQRU5ESU5HCiAgUkVKRUNURUQKICBSRVNUUklDVEVECiAgQVRURU5USU9OX05FRURFRAp9CgplbnVtIEVudW1QYXltZW50UHJvdmlkZXIgewogIFNUUklQRQp9CgplbnVtIEVudW1FdmVudEFjdG9yIHsKICBDT1VSSUVSCiAgQURNSU4KICBQQVJUTkVSCn0KCmVudW0gRW51bUxvY2F0aW9uTm90ZUFjdG9yIHsKICBDT1VSSUVSCiAgQURNSU4KICBQQVJUTkVSCn0KCmVudW0gRW51bUxvY2F0aW9uTm90ZVJlYWN0aW9uVHlwZSB7CiAgVVBWT1RFCiAgRE9XTlZPVEUKfQoKZW51bSBFbnVtRGVsaXZlcnlFdmVudFNvdXJjZSB7CiAgT1BFTkNPVVJJRVIKICBQQVJUTkVSX0FQUAp9CgplbnVtIEVudW1VbmRlbGl2ZXJhYmxlQWN0aW9uIHsKICBMRUFWRV9BVF9ET09SCiAgUkVUVVJOCiAgRElTQ0FSRAp9CgplbnVtIEVudW1EZWxpdmVyYWJsZUFjdGlvbiB7CiAgTUVFVF9BVF9ET09SCiAgTEVBVkVfQVRfRE9PUgp9Cg==",
  "inlineSchemaHash": "3ba320604ae1ae6cd157cff1876c073a85fbd8c5fde08ff712edb679bead9cc1",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"email\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumUserRole\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"username\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"courier\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Partner\",\"relationName\":\"PartnerToUser\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Comment\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"likers\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"commentableId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"commentableType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"couriers\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CommentToCourier\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Courier\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"node_uri\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"https://localhost\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"firstName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lastName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumCourierStatus\",\"default\":\"OFFLINE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliverySetting\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumCourierDeliverySetting\",\"default\":\"MANUAL\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rejectedOffers\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"CourierToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripeAccountId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripeAccountStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumStripeAccountStatus\",\"default\":\"REJECTED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comments\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comment\",\"relationName\":\"CommentToCourier\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"earnings\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Earning\",\"relationName\":\"CourierToEarning\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"CourierToDelivery\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"settings\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CourierSetting\",\"relationName\":\"CourierToCourierSetting\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Payout\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payout\",\"relationName\":\"CourierToPayout\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Transfer\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Transfer\",\"relationName\":\"CourierToTransfer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locationNotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LocationNote\",\"relationName\":\"CourierToLocationNote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locationNoteReactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LocationNoteReaction\",\"relationName\":\"CourierToLocationNoteReaction\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Earning\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pending\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"received\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payoutMethod\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"couriers\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToEarning\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Location\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addressLine1\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"addressLine2\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"city\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"state\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"street\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zipCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"countryCode\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumCountryCode\",\"default\":\"US\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stateCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"houseNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"longitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latitude\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"formattedAddress\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"locationNotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LocationNote\",\"relationName\":\"LocationToLocationNote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDelivery\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"pickupDelivery\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffDelivery\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"dropoffDelivery\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDeliveryQuotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeliveryQuote\",\"relationName\":\"pickupDeliveryQuotes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffDeliveryQuotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeliveryQuote\",\"relationName\":\"dropoffDeliveryQuotes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Partner\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"logo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"phoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"webhookUrl\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"deliveries\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"DeliveryToPartner\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryQuotes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeliveryQuote\",\"relationName\":\"DeliveryQuoteToPartner\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"userId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"user\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"User\",\"relationName\":\"PartnerToUser\",\"relationFromFields\":[\"userId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"SetNull\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DeliveryQuote\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quote\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quoteRangeFrom\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quoteRangeTo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feePercentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currency\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"duration\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distance\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"distanceUnit\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumDistanceUnit\",\"default\":\"MILES\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupPhoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffPhoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupReadyAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDeadlineAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffReadyAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffEta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffDeadlineAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderTotalValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"pickupLocationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupLocation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Location\",\"relationName\":\"pickupDeliveryQuotes\",\"relationFromFields\":[\"pickupLocationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffLocationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffLocation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Location\",\"relationName\":\"dropoffDeliveryQuotes\",\"relationFromFields\":[\"dropoffLocationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partnerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partners\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Partner\",\"relationName\":\"DeliveryQuoteToPartner\",\"relationFromFields\":[\"partnerId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"Delivery\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"DeliveryToDeliveryQuote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Delivery\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupPhoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupBusinessName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupNotes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupVerification\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupLocationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupReadyAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupDeadlineAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffPhoneNumber\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffBusinessName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffNotes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffSellerNotes\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffVerification\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffReadyAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffEta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffDeadlineAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliverableAction\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumDeliverableAction\",\"default\":\"MEET_AT_DOOR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"undeliverableAction\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumUndeliverableAction\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"undeliverableReason\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffLocationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryTypes\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requiresDropoffSignature\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requiresId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderReference\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderTotalValue\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orderItems\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumDeliveryStatus\",\"default\":\"CREATED\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"customerNotes\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"currencyCode\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pickupTypes\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageType\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageName\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imageData\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Bytes\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"idempotencyKey\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalStoreId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"returnVerification\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalUserInfo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"externalId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partnerId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryQuoteId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fee\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"feePercentage\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pay\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"tips\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Float\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"totalCompensation\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rejectedByCouriers\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"matchedCourierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"pickupLocation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Location\",\"relationName\":\"pickupDelivery\",\"relationFromFields\":[\"pickupLocationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dropoffLocation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Location\",\"relationName\":\"dropoffDelivery\",\"relationFromFields\":[\"dropoffLocationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courier\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToDelivery\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"partner\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Partner\",\"relationName\":\"DeliveryToPartner\",\"relationFromFields\":[\"partnerId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeliveryQuote\",\"relationName\":\"DeliveryToDeliveryQuote\",\"relationFromFields\":[\"deliveryQuoteId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"DeliveryToPayment\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryEvent\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DeliveryEvent\",\"relationName\":\"DeliveryToDeliveryEvent\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locationNote\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LocationNote\",\"relationName\":\"DeliveryToLocationNote\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"idempotencyKey\",\"partnerId\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"idempotencyKey\",\"partnerId\"]}],\"isGenerated\":false},\"DeliveryEvent\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transitionSuccessful\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumDeliveryEventType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actor\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumEventActor\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"eventSource\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumDeliveryEventSource\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"oldStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumDeliveryStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"newStatus\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumDeliveryStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"message\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"DeliveryToDeliveryEvent\",\"relationFromFields\":[\"deliveryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LocationNote\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"note\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"actor\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumLocationNoteActor\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locationId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locations\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Location\",\"relationName\":\"LocationToLocationNote\",\"relationFromFields\":[\"locationId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"DeliveryToLocationNote\",\"relationFromFields\":[\"deliveryId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"couriers\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToLocationNote\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"noteReactions\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LocationNoteReaction\",\"relationName\":\"LocationNoteToLocationNoteReaction\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"LocationNoteReaction\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reaction\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumLocationNoteReactionType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"locationNoteId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locationNote\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"LocationNote\",\"relationName\":\"LocationNoteToLocationNoteReaction\",\"relationFromFields\":[\"locationNoteId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"couriers\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToLocationNoteReaction\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CourierSetting\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vehicleType\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumSettingVehicleType\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preferredAreas\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"shiftAvailability\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Json\",\"default\":\"{\\\"sunday\\\":[],\\\"monday\\\":[],\\\"tuesday\\\":[],\\\"wednesday\\\":[],\\\"thursday\\\":[],\\\"friday\\\":[],\\\"saturday\\\":[]}\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryPreferences\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"foodPreferences\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"earningGoals\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliverySpeed\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumSettingDeliverySpeed\",\"default\":\"REGULAR\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"restaurantTypes\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cuisineTypes\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"preferredRestaurantPartners\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"dietaryRestrictions\",\"kind\":\"scalar\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"dbgenerated\",\"args\":[\"(ARRAY[]::character varying[])::character varying(255)[]\"]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payRate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"couriers\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToCourierSetting\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Payout\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"arrivalDate\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"statementDescriptor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumPayoutStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToPayout\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courier\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToPayout\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Payment\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"capturedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"canceledAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Decimal\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumPaymentStatus\",\"default\":\"REQUIRES_CONFIRMATION\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delivery\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Delivery\",\"relationName\":\"DeliveryToPayment\",\"relationFromFields\":[\"deliveryId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"deliveryId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provider\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"EnumPaymentProvider\",\"default\":\"STRIPE\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"transfers\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Transfer\",\"relationName\":\"PaymentToTransfer\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"refunds\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Refund\",\"relationName\":\"PaymentToRefund\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payouts\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payout\",\"relationName\":\"PaymentToPayout\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stripeData\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"StripePaymentData\",\"relationName\":\"PaymentToStripePaymentData\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"StripePaymentData\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentIntentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentMethodId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"latestChargeId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToStripePaymentData\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Transfer\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"transferId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amountReversed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destination\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"destinationPayment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reversed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToTransfer\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courier\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Courier\",\"relationName\":\"CourierToTransfer\",\"relationFromFields\":[\"courierId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"courierId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Refund\":{\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"cuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":true},{\"name\":\"refundId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"amount\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reason\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumRefundReason\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"EnumRefundStatus\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payment\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Payment\",\"relationName\":\"PaymentToRefund\",\"relationFromFields\":[\"paymentId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"paymentId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Config\":{\"dbName\":null,\"fields\":[{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"spatial_ref_sys\":{\"dbName\":null,\"fields\":[{\"name\":\"srid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auth_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"auth_srid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"srtext\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"proj4text\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.\"}},\"enums\":{\"EnumCourierDeliverySetting\":{\"values\":[{\"name\":\"AUTO_ACCEPT\",\"dbName\":null},{\"name\":\"AUTO_REJECT\",\"dbName\":null},{\"name\":\"MANUAL\",\"dbName\":null},{\"name\":\"NONE\",\"dbName\":null}],\"dbName\":null},\"EnumCourierStatus\":{\"values\":[{\"name\":\"ONLINE\",\"dbName\":null},{\"name\":\"OFFLINE\",\"dbName\":null},{\"name\":\"LAST_CALL\",\"dbName\":null}],\"dbName\":null},\"EnumDeliveryStatus\":{\"values\":[{\"name\":\"CREATED\",\"dbName\":null},{\"name\":\"ASSIGNING_COURIER\",\"dbName\":null},{\"name\":\"ACCEPTED\",\"dbName\":null},{\"name\":\"DISPATCHED\",\"dbName\":null},{\"name\":\"PICKED_UP\",\"dbName\":null},{\"name\":\"ON_THE_WAY\",\"dbName\":null},{\"name\":\"DROPPED_OFF\",\"dbName\":null},{\"name\":\"CANCELED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"EnumDeliveryEventType\":{\"values\":[{\"name\":\"CREATED\",\"dbName\":null},{\"name\":\"CONFIRMED\",\"dbName\":null},{\"name\":\"ACCEPTED\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"DISPATCHED\",\"dbName\":null},{\"name\":\"CANCELED\",\"dbName\":null},{\"name\":\"FULFILLED\",\"dbName\":null},{\"name\":\"DROPPED_OFF\",\"dbName\":null},{\"name\":\"PICKED_UP\",\"dbName\":null},{\"name\":\"ON_THE_WAY\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"EnumCountryCode\":{\"values\":[{\"name\":\"US\",\"dbName\":null}],\"dbName\":null},\"EnumDistanceUnit\":{\"values\":[{\"name\":\"KILOMETERS\",\"dbName\":null},{\"name\":\"MILES\",\"dbName\":null}],\"dbName\":null},\"EnumSettingDeliverySpeed\":{\"values\":[{\"name\":\"REGULAR\",\"dbName\":null},{\"name\":\"RUSH\",\"dbName\":null}],\"dbName\":null},\"EnumSettingVehicleType\":{\"values\":[{\"name\":\"BICYCLE\",\"dbName\":null},{\"name\":\"MOTORCYCLE\",\"dbName\":null},{\"name\":\"CAR\",\"dbName\":null},{\"name\":\"SCOOTER\",\"dbName\":null},{\"name\":\"ON_FOOT\",\"dbName\":null}],\"dbName\":null},\"EnumUserRole\":{\"values\":[{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"COURIER\",\"dbName\":null},{\"name\":\"PARTNER\",\"dbName\":null}],\"dbName\":null},\"EnumPaymentStatus\":{\"values\":[{\"name\":\"CANCELED\",\"dbName\":null},{\"name\":\"REQUIRES_CONFIRMATION\",\"dbName\":null},{\"name\":\"REQUIRES_CAPTURE\",\"dbName\":null},{\"name\":\"PROCESSING\",\"dbName\":null},{\"name\":\"REQUIRES_ACTION\",\"dbName\":null},{\"name\":\"REQUIRES_PAYMENT_METHOD\",\"dbName\":null},{\"name\":\"SUCCEEDED\",\"dbName\":null}],\"dbName\":null},\"EnumRefundReason\":{\"values\":[{\"name\":\"DUPLICATE\",\"dbName\":null},{\"name\":\"FRAUDULENT\",\"dbName\":null},{\"name\":\"REQUESTED_BY_CUSTOMER\",\"dbName\":null},{\"name\":\"EXPIRED_UNCAPTURED_CHARGE\",\"dbName\":null}],\"dbName\":null},\"EnumRefundStatus\":{\"values\":[{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"REQUIRES_ACTION\",\"dbName\":null},{\"name\":\"SUCCEEDED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null},{\"name\":\"CANCELED\",\"dbName\":null}],\"dbName\":null},\"EnumPayoutStatus\":{\"values\":[{\"name\":\"PAID\",\"dbName\":null},{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"IN_TRANSIT\",\"dbName\":null},{\"name\":\"CANCELED\",\"dbName\":null},{\"name\":\"FAILED\",\"dbName\":null}],\"dbName\":null},\"EnumStripeAccountStatus\":{\"values\":[{\"name\":\"COMPLETE\",\"dbName\":null},{\"name\":\"ENABLED\",\"dbName\":null},{\"name\":\"PENDING\",\"dbName\":null},{\"name\":\"REJECTED\",\"dbName\":null},{\"name\":\"RESTRICTED\",\"dbName\":null},{\"name\":\"ATTENTION_NEEDED\",\"dbName\":null}],\"dbName\":null},\"EnumPaymentProvider\":{\"values\":[{\"name\":\"STRIPE\",\"dbName\":null}],\"dbName\":null},\"EnumEventActor\":{\"values\":[{\"name\":\"COURIER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"PARTNER\",\"dbName\":null}],\"dbName\":null},\"EnumLocationNoteActor\":{\"values\":[{\"name\":\"COURIER\",\"dbName\":null},{\"name\":\"ADMIN\",\"dbName\":null},{\"name\":\"PARTNER\",\"dbName\":null}],\"dbName\":null},\"EnumLocationNoteReactionType\":{\"values\":[{\"name\":\"UPVOTE\",\"dbName\":null},{\"name\":\"DOWNVOTE\",\"dbName\":null}],\"dbName\":null},\"EnumDeliveryEventSource\":{\"values\":[{\"name\":\"OPENCOURIER\",\"dbName\":null},{\"name\":\"PARTNER_APP\",\"dbName\":null}],\"dbName\":null},\"EnumUndeliverableAction\":{\"values\":[{\"name\":\"LEAVE_AT_DOOR\",\"dbName\":null},{\"name\":\"RETURN\",\"dbName\":null},{\"name\":\"DISCARD\",\"dbName\":null}],\"dbName\":null},\"EnumDeliverableAction\":{\"values\":[{\"name\":\"MEET_AT_DOOR\",\"dbName\":null},{\"name\":\"LEAVE_AT_DOOR\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)


config.injectableEdgeEnv = () => ({
  parsed: {
    DB_URL: typeof globalThis !== 'undefined' && globalThis['DB_URL'] || typeof process !== 'undefined' && process.env && process.env.DB_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

