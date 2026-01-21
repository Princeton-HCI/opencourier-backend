import { Throttle } from '@nestjs/throttler/dist/throttler.decorator'

export const PLATFORM_NAME = 'PLATFORM_NAME'
export const PLATFORM_NAME_SHORT = 'PLATFORM_NAME_SHORT'
export const NOSH_ENV = 'NOSH_ENV'
export const PUBLIC_API_URL = 'PUBLIC_API_URL'
export const MERCHANT_HELP_PHONE_NUMBER = '9708185603'
export const ADMIN_URL = 'ADMIN_URL'

export const ENABLE_PUB_SUB = 'ENABLE_PUB_SUB'
export const REDIS_URL = 'REDIS_URL'
export const MESSAGE_BUS_QUEUE = 'messageBus'

// Slack
export const SLACK_NOTIFICATION_BOT_TOKEN = 'SLACK_NOTIFICATION_BOT_TOKEN'
export const SLACK_ALERT_NOTIFICATION_CHANNEL_ID = 'SLACK_ALERT_NOTIFICATION_CHANNEL_ID'
export const SLACK_CUSTOMER_CHAT_CHANNEL_ID = 'SLACK_CUSTOMER_CHAT_CHANNEL_ID'

// GCP specific
export const GCP_PROJECT_NAME = 'GCP_PROJECT_NAME'
export const GCP_BUCKET_NAME = 'GCP_BUCKET_NAME'
export const GCP_LOCATION = 'GCP_LOCATION'

// Minio specific
export const MINIO_USER = 'MINIO_USER'
export const MINIO_PASSWORD = 'MINIO_PASSWORD'

//Used by providers/secrets/secretsManager.module
export const JWT_SECRET_KEY = 'JWT_SECRET_KEY'
export const JWT_REFRESH_SECRET_KEY = 'JWT_REFRESH_SECRET_KEY'
export const JWT_EXPIRATION = 'JWT_EXPIRATION'
export const JWT_REFRESH_EXPIRATION = 'JWT_REFRESH_EXPIRATOPM'

//Used by config service for modules in the /integrations folder
//chowly
export const CHOWLY_API_KEY = 'CHOWLY_API_KEY'
export const CHOWLY_BASE_URL = 'CHOWLY_BASE_URL'

//checkmate
export const CHECKMATE_CLIENT_ID = 'CHECKMATE_CLIENT_ID'
export const CHECKMATE_CLIENT_SECRET = 'CHECKMATE_CLIENT_SECRET'
export const CHECKMATE_REDIRECT_URL = 'CHECKMATE_REDIRECT_URL'
export const CHECKMATE_BASE_URL = 'CHECKMATE_BASE_URL'

//shipday
export const SHIPDAY_API_KEY = 'SHIPDAY_API_KEY'
export const SHIPDAY_BASE_URL = 'SHIPDAY_BASE_URL'

//twilio
export const TWILIO_ACCOUNT_SID = 'TWILIO_ACCOUNT_SID'
export const TWILIO_AUTH_TOKEN = 'TWILIO_AUTH_TOKEN'
export const TWILIO_VERIFICATIONS_SERVICE_SID = 'TWILIO_VERIFICATIONS_SERVICE_SID'
export const TWILIO_API_KEY_SID = 'TWILIO_API_KEY_SID'
export const TWILIO_API_KEY_SECRET = 'TWILIO_API_KEY_SECRET'
export const TWILIO_CONVERSATIONS_SERVICE_SID = 'TWILIO_CONVERSATIONS_SERVICE_SID'
export const TWILIO_PHONE_NUMBER = 'TWILIO_PHONE_NUMBER'

// Shovel
export const SHOVEL_DATABASE_CONNECTION_HOST_STRING = 'SHOVEL_DATABASE_CONNECTION_HOST_STRING'

// AGORA
export const AGORA_CHAIN = 'AGORA_CHAIN'
export const AGORA_API_PRIVATE_KEY = 'AGORA_API_PRIVATE_KEY'
export const AGORA_API_L1_RPC_WS = 'AGORA_API_L1_RPC_WS'
export const AGORA_API_L2_RPC_WS = 'AGORA_API_L2_RPC_WS'
export const AGORA_BUNDLER_RPC = 'AGORA_BUNDLER_RPC'

//Stripe
export const STRIPE_CLIENT = 'STRIPE_CLIENT'
export const STRIPE_SECRET_KEY = 'STRIPE_SECRET_KEY'
export const STRIPE_WEBHOOK_SECRET = 'STRIPE_WEBHOOK_SECRET'
export const STRIPE_TEST_MERCHANT_CONNECT_ID = 'STRIPE_TEST_MERCHANT_CONNECT_ID'

//Delivery
export const DEFAULT_QUOTE_TO_DELIVERY_MAX_DISTANCE_DRIFT = 'DEFAULT_QUOTE_TO_DELIVERY_MAX_DISTANCE_DRIFT'
export const DEFAULT_MAX_ASSIGNMENT_DISTANCE = 'DEFAULT_MAX_ASSIGNMENT_DISTANCE'
export const DEFAULT_DISTANCE_UNIT = 'DEFAULT_DISTANCE_UNIT'
export const DELIVERY_QUOTE_PER_MILE = 'DELIVERY_QUOTE_PER_MILE'
export const DEFAULT_CURRENCY = 'DEFAULT_CURRENCY'
export const DEFAULT_COURIER_COMPENSATION_CALCULATION_TYPE = 'DEFAULT_COURIER_COMPENSATION_CALCULATION_TYPE'

export const DEFAULT_QUOTE_CALCULATION_TYPE = 'DEFAULT_QUOTE_CALCULATION_TYPE'
export const DEFAULT_GEO_CALCULATION_TYPE = 'DEFAULT_GEO_CALCULATION_TYPE'
export const DEFAULT_COURIER_MATCHER_TYPE = 'DEFAULT_COURIER_MATCHER_TYPE'
export const DEFAULT_QUOTE_TO_DELIVERY_CONVERSION_TYPE = 'DEFAULT_QUOTE_TO_DELIVERY_CONVERSION_TYPE'
export const DEFAULT_DELIVERY_DURATION_CALCULATION_TYPE = 'DEFAULT_DELIVERY_DURATION_CALCULATION_TYPE'
export const DELIVERY_QUOTE_EXPIRATION_MINUTES = 'DELIVERY_QUOTE_EXPIRATION_MINUTES'
export const DEFAULT_FEE_PERCENTAGE_AMOUNT = 'DEFAULT_FEE_PERCENTAGE_AMOUNT'

// API
export const ADMIN_API_V1_PREFIX = 'api/admin/v1'
export const COURIER_API_V1_PREFIX = 'api/courier/v1'
export const PARTNER_API_V1_PREFIX = 'api/partner/v1'
export const PARTNER_ADMIN_API_V1_PREFIX = 'api/partner-admin/v1'
export const COMMON_API_V1_PREFIX = 'api/common/v1'
export const PUBLIC_API_V1_PREFIX = 'api/public/v1'

export const ABLY_API_KEY = 'ABLY_API_KEY'

export const FORWARD_ORDERS_TO_INTEGRATIONS = 'FORWARD_ORDERS_TO_INTEGRATIONS'
export const ALLOW_ROBOCALLS = 'ALLOW_ROBOCALLS'
export const KNOWN_INTEGRATION_TEST_MERCHANTS = [
  'ae8dc93fd8430f46', // Chowly
  '225594', // Checkmate
]

export const CO_TAX_API_KEY = 'CO_TAX_API_KEY'

// TODO: Nick suggested to make it a configurable item per restaurant, but for now we will keep it simple as a global setting.
export const MERCHANT_CATALOG_PREPARATION_MINUTES = 45

export const PREPARATION_BUFFER_MINUTES = 15

// TODO: Mike suggested this should be calculated as a function of addresses and available drivers.
export const DELIVERY_DURATION_MINUTES = 30

export const CHAT_ADMIN_ID = 'NOSH_ADMIN'

export const PUBLIC_DEFAULT_THROTTLE: Parameters<typeof Throttle>[0] = {
  default: {
    limit: 3,
    ttl: 60000,
  },
}

export const SEARCH_THROTTLE: Parameters<typeof Throttle>[0] = {
  default: {
    limit: 120,
    ttl: 60000,
  },
}

// Minutes to wait between order confirmation and us force fulfilling order due to restaurants being lazy
export const PICKUP_ORDER_FORCED_FULFILL_DELAY_MINUTES = 90

// Minutes to wait to cancel order in cases when order can still be recovered
export const ORDER_PAYMENT_CANCELLATION_DELAY_MINUTES = 60
