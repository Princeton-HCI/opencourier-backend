import { Global, Module } from '@nestjs/common'
import { GcpStorageService } from './gcpStorage.service'
import { useProvideClass } from '../../core/utils/provider'
import { StorageProvider } from '../../services/storage/models/StorageProvider'

@Global()
@Module({
  providers: [useProvideClass(StorageProvider, GcpStorageService)],
  exports: [StorageProvider],
})
export class GcpStorageModule {}
