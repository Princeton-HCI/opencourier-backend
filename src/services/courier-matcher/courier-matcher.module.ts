import { DynamicModule, Global, Module } from '@nestjs/common'
import { CourierDomainModule } from 'src/domains/courier/courier.domain.module'
import { DeliveryDomainModule } from 'src/domains/delivery/delivery.domain.module'
import { PartnerDomainModule } from 'src/domains/partner/partner.domain.module'
import { LocationDomainModule } from 'src/domains/location/location.domain.module'
import { NearestCourierMatcherService } from './nearest-courier-matcher.service'
import { CourierMatcherService } from './courier-matcher.service'
import { StaticCourierMatcherService } from './static-courier-matcher.service'
import { useProvideClass } from 'src/core/utils/provider'
import { EnumCourierMatcherType } from 'src/shared-types/index'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'
import { CourierSeniorityMatcherService } from './courier-seniority-matcher.service'
import { HungarianCourierMatcherService} from './hungarian-courier-matcher.service'

@Global()
@Module({
  imports: [DeliveryDomainModule, PartnerDomainModule, CourierDomainModule, LocationDomainModule, ConfigDomainModule],
})
export class CourierMatcherModule {
  static forRoot(): DynamicModule {
    const providers = [
      useProvideClass(CourierMatcherService, CourierMatcherService),
      {
        provide: EnumCourierMatcherType.NEAREST_COURIER,
        useClass: NearestCourierMatcherService,
      },
      {
        provide: EnumCourierMatcherType.COURIER_SENIORITY,
        useClass: CourierSeniorityMatcherService,
      },
      {
        provide: EnumCourierMatcherType.STATIC,
        useClass: StaticCourierMatcherService,
      },
      {
        provide: EnumCourierMatcherType.HUNGARIAN,
        useClass: HungarianCourierMatcherService
      },
      HungarianCourierMatcherService,
    ]

    return {
      module: CourierMatcherModule,
      providers: providers,
      exports: providers,
    }
  }
}
