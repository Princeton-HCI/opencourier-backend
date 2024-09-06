import { PrismaClient } from '@prisma/types'
import { seedCouriers } from './couriers'
import { seedAdminUser } from './admin'
import { seedPartnerUser } from './partner'
import { seedInitialInstanceConfig } from './instance-config'

const prisma = new PrismaClient()

async function seed() {
  await seedCouriers(prisma)
  await seedAdminUser(prisma)
  await seedPartnerUser(prisma)
  await seedInitialInstanceConfig(prisma)
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
