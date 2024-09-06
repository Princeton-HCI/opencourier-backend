import { ExecutionContext } from '@nestjs/common'
import { Scope } from '@sentry/node'
import { SeverityLevel } from '@sentry/types'

export interface SentryScopeTransformerFunction {
  (scope: Scope, context: ExecutionContext): void
}

export interface SentryFilterFunction {
  (exception: any): boolean
}

export interface SentryInterceptorOptionsFilter {
  type: any
  filter?: SentryFilterFunction
}

export interface SentryInterceptorOptions {
  filters?: SentryInterceptorOptionsFilter[]
  transformers?: SentryScopeTransformerFunction[]
  tags?: { [key: string]: string }
  extra?: { [key: string]: any }
  fingerprint?: string[]
  level?: SeverityLevel
  request?: boolean
  serverName?: boolean
  transaction?: boolean | 'path' | 'methodPath' | 'handler'
  user?: boolean | string[]
  version?: boolean
}
