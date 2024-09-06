import { DynamicModule, Module } from '@nestjs/common'
import { SimpleDeliveryDurationCalculationService } from './simple-delivery-duration-calculation.service'
import { GeoCalculationModule } from '../geo-calculation/geo-calculation.module'
import { DeliveryDurationCalculationService } from './delivery-duration-calculation.service';
import { EnumDeliveryDurationCalculationType } from './enums/delivery-duration-calculation-type.enum';
import { ConfigDomainModule } from 'src/domains/config/config.domain.module';

@Module({
  imports: [
    GeoCalculationModule.forRoot(),
    ConfigDomainModule
  ],
})
export class DeliveryDurationCalculationModule {
  static forRoot(): DynamicModule {
    const providers = [
      {
        provide: DeliveryDurationCalculationService,
        useClass: DeliveryDurationCalculationService,
      },
      {
        provide: EnumDeliveryDurationCalculationType.SIMPLE,
        useClass: SimpleDeliveryDurationCalculationService,
      },
    ]

    return {
      module: DeliveryDurationCalculationModule,
      providers: providers,
      exports: providers
    }
  }
}
