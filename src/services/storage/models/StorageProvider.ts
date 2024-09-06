import mime from 'mime-types'
import { UploadedFile } from './UploadedFile'

export abstract class StorageProvider {
  abstract deleteFile(filePath: string): Promise<void> | void
  abstract deleteFileByUrl(fileUrl: string): Promise<void> | void
  abstract uploadFile(file: Express.Multer.File, filePath: string): Promise<UploadedFile> | UploadedFile
  abstract uploadBuffer(data: Buffer, filePath: string): Promise<UploadedFile> | UploadedFile

  guessExtension(uploadedFile: Express.Multer.File, defaultExtension?: string) {
    return mime.extension(uploadedFile.mimetype) || defaultExtension
  }

  protected isBuffer(data: Express.Multer.File | Buffer): data is Buffer {
    return data instanceof Buffer
  }
}
