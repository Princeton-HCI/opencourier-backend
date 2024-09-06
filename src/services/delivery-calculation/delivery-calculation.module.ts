import { Module } from '@nestjs/common'
import { DeliveryCalculationService } from './delivery-calculation.service'
import { GeoCalculationModule } from '../geo-calculation/geo-calculation.module'
import { QuoteCalculationModule } from '../quote-calculation/quote-calculation.module'
import { DeliveryDurationCalculationModule } from '../duration-calculation/delivery-duration-calculation.module'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'
import { CourierCompensationModule } from '../courier-compensation/courier-compensation.module'

@Module({
  imports: [
    ConfigDomainModule,
    QuoteCalculationModule.forRoot(),
    GeoCalculationModule.forRoot(),
    CourierCompensationModule.forRoot(),
    DeliveryDurationCalculationModule.forRoot(),
  ],
  providers: [DeliveryCalculationService],
  exports: [DeliveryCalculationService],
})
export class DeliveryCalculationModule {}
