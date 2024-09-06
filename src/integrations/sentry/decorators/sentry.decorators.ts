import { SentryScopeTransformerFunction } from '../models/Sentry'
import { SetMetadata } from '@nestjs/common'

export const SENTRY_LOCAL_TRANSFORMERS_METADATA = 'sentry-local-transformers'

export const SentryTransformer = (...transformers: SentryScopeTransformerFunction[]) =>
  SetMetadata(SENTRY_LOCAL_TRANSFORMERS_METADATA, transformers)
