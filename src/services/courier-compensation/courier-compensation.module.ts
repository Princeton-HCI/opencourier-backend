import { DynamicModule, Module } from '@nestjs/common'
import { ConfigDomainModule } from 'src/domains/config/config.domain.module'
import { CourierCompensationService } from './courier-compensation.service'
import { EnumCourierCompensationCalculationType } from 'src/shared-types/index'
import { SimpleCourierCompensationService } from './simple-courier-compensation.service'

@Module({
  imports: [ConfigDomainModule],
})
export class CourierCompensationModule {
  static forRoot(): DynamicModule {
    const providers = [
      {
        provide: CourierCompensationService,
        useClass: CourierCompensationService,
      },
      {
        provide: EnumCourierCompensationCalculationType.FROM_QUOTE_FROM,
        useClass: SimpleCourierCompensationService,
      },
    ]

    return {
      module: CourierCompensationModule,
      providers: providers,
      exports: providers,
    }
  }
}
