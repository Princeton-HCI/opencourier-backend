import { ArgumentsHost, Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Response } from 'express'
import { ApiException, ErrorCode } from '../errors'
import { isRecordNotFoundError, isUniqueConstraintError } from '../prisma.util'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

@Catch(ApiException, PrismaClientKnownRequestError)
export class HttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: ApiException | PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log(exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    if (exception instanceof ApiException) {
      response.status(exception.getStatus()).json({
        code: exception.code,
        message: exception.message,
        statusCode: exception.statusCode,
      })
    } else if (isRecordNotFoundError(exception)) {
      response.status(404).json({
        code: ErrorCode.NOT_FOUND,
        message: 'Not found',
        statusCode: 404,
      })
    } else if (isUniqueConstraintError(exception)) {
      response.status(404).json({
        code: ErrorCode.UNIQUE_CONSTRAINT,
        message: 'Unique constraint',
        statusCode: 400,
      })
    } else {
      response.status(500).json({
        code: ErrorCode.UNKNOWN,
        message: 'Internal server error',
        statusCode: 500,
      })
    }
  }
}
