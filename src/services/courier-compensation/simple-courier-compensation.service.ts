import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ICourierCompensationService } from './interfaces/ICourierCompensationService'
import { ICourierCompensationForDeliveryInput } from './interfaces/ICourierCompensationForDeliveryInput'
import { CourierRepository } from 'src/persistence/repositories/courier.repository'
import { DeliveryRepository } from 'src/persistence/repositories/delivery.repository'
import { DeliveryQuoteRepository } from 'src/persistence/repositories/delivery-quote.repository'

@Injectable()
export class SimpleCourierCompensationService implements ICourierCompensationService {
  private readonly logger = new Logger(SimpleCourierCompensationService.name)

  constructor(
    private readonly configService: ConfigService,
    private readonly courierRepository: CourierRepository,
    private readonly deliveryRepository: DeliveryRepository,
    private readonly deliveryQuoteRepository: DeliveryQuoteRepository
  ) {}

  async calculateCourierCompensation(input: ICourierCompensationForDeliveryInput): Promise<number> {
    this.logger.log('Calculating courier compensation')

    return Promise.resolve(1)
  }

  async calculateCourierCompensationForDelivery(input: ICourierCompensationForDeliveryInput): Promise<number> {
    this.logger.log('Calculating courier compensation for delivery')
    const { courierId, deliveryId } = input

    const courier = await this.courierRepository.findById(courierId)
    if (!courier) {
      this.logger.error(`Courier not found: ${courierId}`)
      return Promise.reject(new Error(`Courier not found: ${courierId}`))
    }

    const delivery = await this.deliveryRepository.findById(deliveryId)
    if (!delivery) {
      this.logger.error(`Delivery not found: ${deliveryId}`)
      return Promise.reject(new Error(`Delivery not found: ${deliveryId}`))
    }

    const deliveryQuote = await this.deliveryQuoteRepository.findById(delivery.deliveryQuoteId)
    if (!deliveryQuote) {
      this.logger.error(`Delivery quote not found: ${delivery.deliveryQuoteId}`)
      return Promise.reject(new Error(`Delivery quote not found: ${delivery.deliveryQuoteId}`))
    }

    return Promise.resolve(deliveryQuote.quoteRangeFrom)
  }
}
