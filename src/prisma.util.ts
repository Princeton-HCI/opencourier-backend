import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export const PRISMA_RECORD_NOT_FOUND_ERROR = 'P2025'
export const PRISMA_UNIQUE_CONSTRAINT_ERROR = 'P2002'

export function isRecordNotFoundError(error: Error): boolean {
  return error instanceof PrismaClientKnownRequestError && error.code === PRISMA_RECORD_NOT_FOUND_ERROR
}

export function isUniqueConstraintError(error: Error): boolean {
  return error instanceof PrismaClientKnownRequestError && error.code === PRISMA_UNIQUE_CONSTRAINT_ERROR
}
