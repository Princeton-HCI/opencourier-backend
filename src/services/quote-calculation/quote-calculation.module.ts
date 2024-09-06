import { DynamicModule, Module } from '@nestjs/common'
import { SimpleQuoteCalculationService } from './simple-quote-calculation.service'
import { GeoCalculationModule } from '../geo-calculation/geo-calculation.module'
import { EnumQuoteCalculationType } from 'src/shared-types/index'
import { CustomQuoteCalculationService } from './custom-quote-calculation.service'
import { SurgeQuoteCalculationService } from './surge-quote-calculation.service'
import { QuoteCalculationService } from './quote-calculation.service'
import { useProvideClass } from 'src/core/utils/provider'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'

@Module({
  imports: [ConfigDomainModule, GeoCalculationModule.forRoot()],
})
export class QuoteCalculationModule {
  static forRoot(): DynamicModule {
    const providers = [
      useProvideClass(QuoteCalculationService, QuoteCalculationService),
      {
        provide: EnumQuoteCalculationType.BY_DISTANCE,
        useClass: SimpleQuoteCalculationService,
      },
      {
        provide: EnumQuoteCalculationType.CUSTOM,
        useClass: CustomQuoteCalculationService,
      },
      {
        provide: EnumQuoteCalculationType.SURGE,
        useClass: SurgeQuoteCalculationService,
      },
    ]

    return {
      module: QuoteCalculationModule,
      providers: providers,
      exports: providers,
    }
  }
}
