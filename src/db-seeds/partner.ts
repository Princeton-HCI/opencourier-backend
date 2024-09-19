import { EnumUserRole, PrismaClient } from '@prisma/types'
import { hash } from 'bcryptjs'
import { parseSalt } from 'src/domains/auth/password.service'

const DEV_PARTNER_API_KEY =
  'zn0vTaZobhvd95utXZ0dY4LIcoofhUGBV2NJ6WCNi5a9TIhaHgDLSxWiaw0nTHSqWlctMZLxKvJ009M4EqdkknozICP9u8zD6vIiCmdbduSoeTwNHX6Uhfp7KQLAVMnX'

export async function seedPartnerUser(prisma: PrismaClient) {
  if (!process.env.BCRYPT_SALT) {
    throw new Error('BCRYPT_SALT is not defined')
  }

  const userSalt = parseSalt(process.env.BCRYPT_SALT)

  console.log('Seeding partner user...')

  const email = `opencourier-partner@opencourier.com`
  const pwd = `partnerUser@123`
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (existingUser) {
    console.log(`User with email ${email} already exists. Skipping...`)

    const existsInPartnerDB = await prisma.partner.findFirst({
      where: {
        userId: existingUser.id,
      },
    })

    if (!existsInPartnerDB) {
      await createOnDb(prisma, existingUser.id)
    }
    return
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(pwd, userSalt),
      role: [EnumUserRole.PARTNER],
      apiKey: DEV_PARTNER_API_KEY,
    },
  })

  const partnerDB = await createOnDb(prisma, user.id)

  console.log(`Created partner "${partnerDB.name}" with email "${user.email}"`)
}

const createOnDb = async (prisma: PrismaClient, userId: string) => {
  return await prisma.partner.create({
    data: {
      name: 'Nosh',
      logo: 'http://localhost:1231/assets/partner-logo.png',
      phoneNumber: `+${Math.floor(Math.random() * 10000000000)}`,
      webhookUrl: 'http://localhost:3000/v1/courier/webhooks',
      userId: userId,
    },
  })
}
