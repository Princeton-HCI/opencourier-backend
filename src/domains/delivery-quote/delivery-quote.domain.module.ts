import { Module } from '@nestjs/common'
import { DeliveryQuoteDomainService } from './delivery-quote.domain.service';
import { DeliveryCalculationModule } from 'src/services/delivery-calculation/delivery-calculation.module';
import { ConfigDomainModule } from '../config/config.domain.module';

@Module({
	imports: [DeliveryCalculationModule, ConfigDomainModule],
	providers: [DeliveryQuoteDomainService],
  exports: [DeliveryQuoteDomainService],
})
export class DeliveryQuoteDomainModule {}
