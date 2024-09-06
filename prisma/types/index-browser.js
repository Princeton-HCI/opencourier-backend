
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


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

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

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
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
