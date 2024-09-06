import * as common from '@nestjs/common'
import { ApiProperty, ApiResponse, ApiResponseOptions } from '@nestjs/swagger'
import { HttpExceptionOptions } from '@nestjs/common/exceptions/http.exception'

export const DEFAULT_HTTP_CODE = 418 // I'm a teapot.

export enum ErrorCode {
  UNIQUE_CONSTRAINT = 'UNIQUE_CONSTRAINT',
  VERIFICATION_CODE = 'VERIFICATION_CODE',
  VERIFICATION_LIMIT = 'VERIFICATION_LIMIT',
  NOT_FOUND = 'NOT_FOUND',
  CREATE_FAILED = 'CREATE_FAILED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNKNOWN = 'UNKNOWN',
  NOT_ALLOWED = 'NOT_ALLOWED',

  // Data not found
  DELIVERY_NOT_FOUND = 'DELIVERY_NOT_FOUND',
  COURIER_NOT_FOUND = 'COURIER_NOT_FOUND',
  LOCATION_NOT_FOUND = 'LOCATION_NOT_FOUND',
  COULDNT_CALCULATE = 'COULDNT_CALCULATE',
  DELIVERY_FOR_QUOTE_EXISTS = 'DELIVERY_FOR_QUOTE_EXISTS',
  QUOTE_HAS_EXPIRED = 'QUOTE_HAS_EXPIRED',
  DELIVERY_LOCATION_DOESNT_MATCH_QUOTE = 'DELIVERY_LOCATION_DOESNT_MATCH_QUOTE',

  // Delivery
  DELIVERY_EXISTS = 'DELIVERY_EXISTS',
  DELIVERY_ALREADY_MATCHED = 'DELIVERY_ALREADY_MATCHED',
  DELIVERY_CANT_BE_ACCEPTED = 'DELIVERY_CANT_BE_ACCEPTED',
  DELIVERY_CANT_BE_REJECTED = 'DELIVERY_CANT_BE_REJECTED',

  ENV_VAR_MISSING = 'ENV_VAR_MISSING',

  // State machine
  CANT_UPDATE_DELIVERY_STATUS = 'CANT_UPDATE_DELIVERY_STATUS',

  // Authentication
  UNAUTHORIZED = 'UNAUTHORIZED',
  JWT_EXPIRED = 'JWT_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
  USER_EXISTS = 'USER_EXISTS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',

  // Data validation
  MISSING_DATA = 'MISSING_DATA',
  INVALID_DATA = 'INVALID_DATA',

  // Integrations
  INTEGRATION_ERROR = 'INTEGRATION_ERROR',

  // Normal operational errors
  CART_EXISTS = 'CART_EXISTS',
  CATALOG_ITEM_UNAVAILABLE = 'CATALOG_ITEM_UNAVAILABLE',
  NOT_ENOUGH_POINTS_IN_BALANCE = 'NOT_ENOUGH_POINTS_IN_BALANCE',
  NO_COURIERS_AVAILABLE = 'NO_COURIERS_AVAILABLE',
  MERCHANT_CLOSED = 'MERCHANT_CLOSED',

  // Bad
  MISSING_PAYMENT_INFO = 'MISSING_PAYMENT_INFO',
  PUSH_NOTIFICATION_DELIVERY_FAILED = 'PUSH_NOTIFICATION_DELIVERY_FAILED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_ERROR',
  MENU_INGESTION_ERROR = 'MENU_INGESTION_ERROR',

  // Critical
  INCONSISTENT_DATA = 'INCONSISTENT_DATA',

  // Payment
  RECOVERABLE_STRIPE_WEBHOOK_ERROR = 'RECOVERABLE_STRIPE_WEBHOOK_ERROR',
  UNRECOVERABLE_STRIPE_WEBHOOK_ERROR = 'UNRECOVERABLE_STRIPE_WEBHOOK_ERROR',

  // Blockchain:
  BLOCKCHAIN_TRANSACTION_ERROR = 'BLOCKCHAIN_TRANSACTION_ERROR',
  BLOCKCHAIN_CONTRACT_REVERSION_ERROR = 'BLOCKCHAIN_CONTRACT_REVERSION_ERROR',
  PAYMENT_CREATION_ERROR = 'PAYMENT_CREATION_ERROR',
}

export const ApiErrorResponse = (options: ApiResponseOptions = {}) =>
  ApiResponse({
    ...options,
    status: DEFAULT_HTTP_CODE,
  })

export class ApiException extends common.HttpException {
  @ApiProperty({
    required: true,
    enum: ErrorCode,
  })
  code!: ErrorCode

  @ApiProperty({
    required: true,
    type: String,
  })
  message!: string

  @ApiProperty({
    required: true,
    type: Number,
  })
  statusCode!: number

  constructor(code: ErrorCode, message: string, statusCode: number, options?: HttpExceptionOptions) {
    super(message, statusCode, options)
    this.code = code
    this.message = message
    this.statusCode = statusCode
  }
}

export class VerificationCodeException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.VERIFICATION_CODE, message, 400, options)
  }
}

export class VerificationLimitException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.VERIFICATION_LIMIT, message, 401, options)
  }
}

export class JwtExpiredException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.JWT_EXPIRED, message, 401, options)
  }
}

export class UnauthorizedException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.UNAUTHORIZED, message, 401, options)
  }
}

export class ForbiddenException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.FORBIDDEN, message, 403, options)
  }
}

export class NotFoundException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.NOT_FOUND, message, 404, options)
  }
}

export class CalculationException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.COULDNT_CALCULATE, message, 404, options)
  }
}

export class UserExistsException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.USER_EXISTS, message, 400, options)
  }
}

export class UserNotFoundException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.USER_NOT_FOUND, message, 400, options)
  }
}

export class DeliveryExistsException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_EXISTS, message, 400, options)
  }
}

export class DeliveryOfferAlreadyMatchedException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_ALREADY_MATCHED, message, 400, options)
  }
}

export class DeliveryNotFoundException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_NOT_FOUND, message, 404, options)
  }
}

export class DeliveryCantBeAcceptedException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_CANT_BE_ACCEPTED, message, 404, options)
  }
}
export class DeliveryCantBeRejectedException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_CANT_BE_REJECTED, message, 404, options)
  }
}

export class CourierNotFoundException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.COURIER_NOT_FOUND, message, 404, options)
  }
}

export class QuoteHasExpiredException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.QUOTE_HAS_EXPIRED, message, 400, options)
  }
}

export class DeliveryForQuoteAlreadyExistsException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_FOR_QUOTE_EXISTS, message, 400, options)
  }
}

export class DeliveryLocationDoesntMatchQuoteException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.DELIVERY_LOCATION_DOESNT_MATCH_QUOTE, message, 400, options)
  }
}

export class LocationNotFoundException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.LOCATION_NOT_FOUND, message, 404, options)
  }
}

export class EnvVarMissingException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.ENV_VAR_MISSING, message, 400, options)
  }
}

export class NotAllowedException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.NOT_ALLOWED, message, 400, options)
  }
}

export class BadRequestException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.BAD_REQUEST, message, 400, options)
  }
}

export class IntegrationException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.INTEGRATION_ERROR, message, 400, options)
  }
}

export class MissingDataException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.MISSING_DATA, message, 400, options)
  }
}

export class InvalidDataException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.INVALID_DATA, message, 400, options)
  }
}

export class CreateFailedException extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.CREATE_FAILED, message, 422, options)
  }
}

export class GenericException extends ApiException {
  constructor(code: ErrorCode, message: string, options?: HttpExceptionOptions) {
    super(code, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * A relationship that in theory must exist in the DB does not
 */
export class InconsistentDataError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.INCONSISTENT_DATA, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Trying to add an item using points but balance is not sufficient.
 */
export class NotEnoughPointsInBalance extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.NOT_ENOUGH_POINTS_IN_BALANCE, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Trying to add an item that is no longer actively available or does not exist
 */
export class CartExistsError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.CART_EXISTS, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Trying to add an item that is no longer actively available or does not exist
 */
export class ItemUnavailableError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.CATALOG_ITEM_UNAVAILABLE, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Placing an order with a closed merchant
 */
export class MerchantClosedError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.MERCHANT_CLOSED, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Either due to distance for some other reason couriers are not available for this order
 */
export class NoCouriersAvailableError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.NO_COURIERS_AVAILABLE, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Delivering one or more push notifications failed
 */
export class PushNotificationDeliveryFailed extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.PUSH_NOTIFICATION_DELIVERY_FAILED, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Error when ingesting menu from integration
 */
export class MenuIngestionError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.MENU_INGESTION_ERROR, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Generic server error.
 */
export class InternalServerError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.INTERNAL_SERVER_ERROR, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * An error which cannot be fixed by our system, for example transfer_group being missing.
 * If this happens then we should return 200 to stripe and log the error.
 */
export class UnrecoverableStripeWebhookError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.UNRECOVERABLE_STRIPE_WEBHOOK_ERROR, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * An error which is either temporary or should be fixed in our system.
 * If this type of error happens we return and error in the webhook and let stripe retry
 * until the error either resolves or we fix the root cause.
 */
export class RecoverableStripeWebhookError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.UNRECOVERABLE_STRIPE_WEBHOOK_ERROR, message, DEFAULT_HTTP_CODE, options)
  }
}

export class PaymentCreationError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.PAYMENT_CREATION_ERROR, message, DEFAULT_HTTP_CODE, options)
  }
}

/**
 * Blockchain Contract Errors
 */
export class BlockchainContractReversionError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.BLOCKCHAIN_CONTRACT_REVERSION_ERROR, message, 409, options)
  }
}
export class BlockchainTransactionError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.BLOCKCHAIN_TRANSACTION_ERROR, message, 409, options)
  }
}

/**
 * Delivery state errors.
 */

export class CantUpdateDeliveryStatusError extends ApiException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(ErrorCode.CANT_UPDATE_DELIVERY_STATUS, message, 409, options)
  }
}
