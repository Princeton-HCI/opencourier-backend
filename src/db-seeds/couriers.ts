import { EnumCourierDeliverySetting, EnumCourierStatus, EnumUserRole, PrismaClient } from '@prisma/types'
import { hash } from 'bcryptjs'
import { parseSalt } from 'src/domains/auth/password.service'

import couriersSeedJson from './couriers-seed-data.json'

export async function seedCouriers(prisma: PrismaClient) {
  if (!process.env.BCRYPT_SALT) {
    throw new Error('BCRYPT_SALT is not defined')
  }

  console.log('Seeding couriers...')

  await seedCouriersFromSeedFile(prisma)
  await seedTestingCourier(prisma)
}

const seedTestingCourier = async (prisma: PrismaClient) => {
  const userSalt = parseSalt(process.env.BCRYPT_SALT)
  const email = `opencourier-courier-testing@opencourier.com`
  const pwd = `courierUser@123`

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    console.log(`User with email ${email} already exists. Skipping...`)
    return
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(pwd, userSalt),
      role: [EnumUserRole.COURIER],
    },
  })

  const courierDB = await prisma.courier.create({
    data: {
      id: 'testing-courier',
      node_uri: '',
      firstName: 'Testing',
      lastName: 'Courier',
      phoneNumber: `+${Math.floor(Math.random() * 10000000000)}`,
      status: EnumCourierStatus.ONLINE,
      userId: user.id,
      deliverySetting: EnumCourierDeliverySetting.MANUAL,
    },
  })

  const point = `POINT(-74.005974 40.712776)`
  await prisma.$queryRaw`
      UPDATE "Courier"
      SET "currentLocation" = ST_GeomFromText(${point}, 4326)
      WHERE "id" = ${courierDB.id}
		`
}

const seedCouriersFromSeedFile = async (prisma: PrismaClient) => {
  const userSalt = parseSalt(process.env.BCRYPT_SALT)

  const couriers = couriersSeedJson
  let createdNr = 0

  for (const courier of couriers) {
    const email = `opencourier-courier-${courier.firstName.toLowerCase()}.${courier.lastName.toLowerCase()}@opencourier.com`
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      console.log(`User with email ${email} already exists. Skipping...`)
      continue
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(courier.userPassword, userSalt),
        role: [EnumUserRole.COURIER],
      },
    })

    const courierDB = await prisma.courier.create({
      data: {
        node_uri: courier.node_uri,
        firstName: courier.firstName,
        lastName: courier.lastName,
        phoneNumber: `+${Math.floor(Math.random() * 10000000000)}`,
        status: courier.status as EnumCourierStatus,
        createdAt: new Date(courier.createdAt),
        updatedAt: new Date(courier.updatedAt),
        userId: user.id,
        deliverySetting: courier.deliverySetting as EnumCourierDeliverySetting,
      },
    })

    const point = `POINT(${courier.currentLocation.longitude} ${courier.currentLocation.latitude})`

    await prisma.$queryRaw`
      UPDATE "Courier"
      SET "currentLocation" = ST_GeomFromText(${point}, 4326)
      WHERE "id" = ${courierDB.id}
		`
    createdNr++
  }

  console.log('Created couriers:', createdNr)
}
