import { DynamicModule, Module } from '@nestjs/common'
import { EnumQuoteToDeliveryConversionServiceType } from 'src/shared-types/index'
import { SimpleQuoteToDeliveryConversionService } from './simple-quote-to-delivery-conversion.service'
import { QuoteToDeliveryConversionService } from './quote-to-delivery-conversion.service'
import { GeoCalculationModule } from '../geo-calculation/geo-calculation.module'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'

@Module({
  imports: [GeoCalculationModule.forRoot(), ConfigDomainModule],
})
export class QuoteToDeliveryConversionModule {
  static forRoot(): DynamicModule {
    const providers = [
      {
        provide: QuoteToDeliveryConversionService,
        useClass: QuoteToDeliveryConversionService,
      },
      {
        provide: EnumQuoteToDeliveryConversionServiceType.SIMPLE,
        useClass: SimpleQuoteToDeliveryConversionService,
      },
    ]

    return {
      module: QuoteToDeliveryConversionModule,
      providers: providers,
      exports: providers,
    }
  }
}
