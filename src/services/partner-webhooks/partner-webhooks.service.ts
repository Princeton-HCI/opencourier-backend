import { Injectable, Logger } from '@nestjs/common'
import { DeliveryStatusUpdateEvent } from 'src/shared-types/index'
import { PartnerWebhookEventType } from './enums/partner-webhook-event-type.enum'
import { DeliveryStatusChangedEventPayload } from './events/delivery-status-changed-event-payload'
import { HttpService } from '@nestjs/axios'
import { AxiosResponse } from 'axios'
import { DeliveryRepository } from 'src/persistence/repositories/delivery.repository'
import { PartnerRepository } from 'src/persistence/repositories/partner.repository'

@Injectable()
export class PartnerWebhookService {
  private readonly logger = new Logger(PartnerWebhookService.name)
  constructor(
    private readonly partnerRepository: PartnerRepository,
    private readonly deliveryRepository: DeliveryRepository,
    private readonly httpService: HttpService
  ) {}

  async sendDeliveryUpdatePartnerWebhook(event: DeliveryStatusUpdateEvent) {
    const delivery = await this.deliveryRepository.findByIdOrThrow(event.deliveryId)
    if (!delivery.partnerId) {
      this.logger.error(`Delivery ${delivery.id} has no partner`)
      return
    }

    const partner = await this.partnerRepository.findById(delivery.partnerId)

    if (!partner) {
      this.logger.error(`Partner ${delivery.partnerId} not found for delivery ${delivery.id}`)
      return
    }

    if (!partner.webhookUrl) {
      this.logger.error(`Partner ${partner.id} has no webhook URL`)
      return
    }

    const webhookPayload: DeliveryStatusChangedEventPayload = {
      eventType: PartnerWebhookEventType.DELIVERY_STATUS_CHANGED,
      deliveryId: delivery.id,
      partnerId: partner.id,
      oldStatus: event.oldStatus,
      newStatus: event.status,
    }

    // Send webhook request to partner
    console.log(`Sending webhook to partner: "${partner.name}"`)
    console.log(webhookPayload)

    const response: AxiosResponse = await this.httpService.axiosRef.post(partner.webhookUrl, webhookPayload)

    // const data = (await firstValueFrom(response))

    console.log(`Response`)
    console.log(response)
  }
}
