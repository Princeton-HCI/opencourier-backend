import { Global, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Bucket, Storage } from '@google-cloud/storage'
import { GCP_BUCKET_NAME, GCP_PROJECT_NAME } from '../../constants'
import { InvalidDataException } from '../../errors'
import { StorageProvider } from '../../services/storage/models/StorageProvider'

@Global()
@Injectable()
export class GcpStorageService extends StorageProvider {
  private readonly bucket: Bucket

  constructor(protected readonly configService: ConfigService) {
    super()

    const projectName = this.configService.get(GCP_PROJECT_NAME)
    const bucketName = this.configService.get(GCP_BUCKET_NAME)

    if (!projectName || !bucketName) {
      throw new Error('Project or bucket name is missing for Cloud Storage')
    }

    const storage = new Storage({
      projectId: projectName,
    })
    this.bucket = storage.bucket(bucketName)
  }

  async deleteFile(filePath: string) {
    await this.bucket.file(filePath).delete({ ignoreNotFound: true })
  }

  async deleteFileByUrl(fileUrl: string) {
    const filePath = fileUrl.split(`/${this.bucket.name}/`)[1]
    if (!filePath) {
      throw new InvalidDataException('Filepath cannot be found from the file URL')
    }
    await this.deleteFile(filePath)
  }

  async uploadFile(file: Express.Multer.File, filePath: string) {
    return this.uploadBuffer(file.buffer, filePath)
  }

  async uploadBuffer(data: Buffer, filePath: string) {
    const bucketFile = this.bucket.file(filePath)
    await bucketFile.save(data)
    return { publicUrl: bucketFile.publicUrl() }
  }
}
