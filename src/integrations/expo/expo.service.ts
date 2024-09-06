import { Expo, ExpoPushMessage } from 'expo-server-sdk'
import { Injectable, Logger } from '@nestjs/common'
import { InconsistentDataError } from '../../errors'

export interface NotificationErrorResponse {
  status: 'error'
  errorMessage: string
  errorCode?:
    | 'DeviceNotRegistered'
    | 'InvalidCredentials'
    | 'MessageTooBig'
    | 'MessageRateExceeded'
    | 'DeveloperError'
    | 'ExpoError'
    | 'ProviderError'
    | undefined
  expoPushToken: string
}

export interface NotificationSuccessResponse {
  status: 'ok'
  expoPushToken: string
}

export interface ReceiptErrorResponse {
  errorMessage: string
  errorCode?: string
}

export type NotificationResponse = NotificationErrorResponse | NotificationSuccessResponse

@Injectable()
export class ExpoService {
  private readonly logger = new Logger(ExpoService.name)
  constructor() {}

  async sendNotification(
    expoPushToken: string,
    body: string,
    title?: string,
    data?: any
  ): Promise<NotificationResponse> {
    const expo = new Expo()

    if (!Expo.isExpoPushToken(expoPushToken)) {
      throw new Error(`Invalid expo push token ${expoPushToken}`)
    }

    const expoMessage: ExpoPushMessage = {
      to: expoPushToken,
      sound: null,
      body,
      title,
      data,
    }

    const tickets = await expo.sendPushNotificationsAsync([expoMessage])
    const ticket = tickets[0]

    if (!ticket) {
      throw new InconsistentDataError('No ticket was returned')
    }

    if (ticket.status === 'ok') {
      return {
        status: 'ok',
        expoPushToken,
      }
    }

    const { message, details } = ticket

    return {
      status: 'error',
      errorMessage: message,
      errorCode: details?.error,
      expoPushToken,
    }
  }

  async checkReceipt(receiptId: string): Promise<ReceiptErrorResponse | null> {
    const expo = new Expo()
    const receipts = await expo.getPushNotificationReceiptsAsync([receiptId])

    // The receipts specify whether Apple or Google successfully received the
    // notification and information about an error, if one occurred.
    if (receipts.length) {
      const receipt = receipts[0]

      if (!receipt) {
        throw new InconsistentDataError('No receipt was returned')
      }

      if (receipt.status === 'ok') {
        return null
      }

      const { message, details } = receipt
      this.logger.error(`There was an error sending a notification: ${message}`)
      if (details && details.error) {
        this.logger.error(`The error code is ${details.error}`)
      }

      return {
        errorMessage: message,
        errorCode: details?.error,
      }
    }
    return null
  }
}
