import { DynamicModule, Module } from '@nestjs/common'
import { HaversineGeoCalculationService } from './haversine-geo-calculation.service'
import { EnumGeoCalculationType } from 'src/shared-types/index'
import { GoogleMatrixAPIGeoCalculationService } from './google-matrix-api-geo-calculation.service'
import { GeoCalculationService } from './geo-calculation.service'
import { RandomGeoCalculationService } from './random-geo-calculation.service'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'

@Module({
  imports: [ConfigDomainModule],
})
export class GeoCalculationModule {
  static forRoot(): DynamicModule {
    const providers = [
      {
        provide: GeoCalculationService,
        useClass: GeoCalculationService,
      },
      {
        provide: EnumGeoCalculationType.HAVERSINE,
        useClass: HaversineGeoCalculationService,
      },
      {
        provide: EnumGeoCalculationType.GOOGLE_MATRIX_API,
        useClass: GoogleMatrixAPIGeoCalculationService,
      },
      {
        provide: EnumGeoCalculationType.RANDOM,
        useClass: RandomGeoCalculationService,
      },
    ]

    return {
      module: GeoCalculationModule,
      providers: providers,
      exports: providers,
    }
  }
}
