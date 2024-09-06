import { Injectable, OnModuleInit, INestApplication, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/types'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  // constructor() {
  //   super({
  //     log: [
  //       {
  //         emit: 'event',
  //         level: 'query',
  //       },
  //     ],
  //   })
  // }
  async onModuleInit(): Promise<void> {
    await this.$connect()
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // this.$on('query', (e) => {
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   console.log(`${e.query} ${e.params}`)
    // })
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect()
  }

  enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', async () => {
      await app.close()
    })
  }
}
