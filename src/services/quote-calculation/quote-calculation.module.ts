import { DynamicModule, Module } from '@nestjs/common'
import { SimpleQuoteCalculationService } from './simple-quote-calculation.service'
import { GeoCalculationModule } from '../geo-calculation/geo-calculation.module'
import { ConfigService } from '@nestjs/config';
import { GeoCalculationService } from '../geo-calculation/geo-calculation.service';
import { EnumQuoteCalculationType } from 'src/shared-types';
import { CustomQuoteCalculationService } from './custom-quote-calculation.service';
import { SurgeQuoteCalculationService } from './surge-quote-calculation.service';
import { QuoteCalculationService } from './quote-calculation.service';
import { useProvideClass } from 'src/core/utils/provider';
import { ConfigDomainModule } from 'src/domains/config/config.domain.module';

@Module({
  imports: [
    ConfigDomainModule,
    GeoCalculationModule.forRoot(),
  ],
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
      // Surge by Time Provider
      {
        provide: EnumQuoteCalculationType.SURGE_BY_TIME,
        useFactory: (
          configService: ConfigService,
          geoCalculationService: GeoCalculationService,
        ) => {
          return new SurgeQuoteCalculationService(
            configService,
            geoCalculationService,
            'SURGE_BY_TIME', 
          );
        },
        inject: [ConfigService, GeoCalculationService],
      },
      // Surge by Day Provider
      {
        provide: EnumQuoteCalculationType.SURGE_BY_DAY,
        useFactory: (
          configService: ConfigService,
          geoCalculationService: GeoCalculationService,
        ) => {
          return new SurgeQuoteCalculationService(
            configService,
            geoCalculationService,
            'SURGE_BY_DAY', 
          );
        },
        inject: [ConfigService, GeoCalculationService],
      }
    ]

    return {
      module: QuoteCalculationModule,
      providers: providers,
      exports: providers,
    }
  }
}
