import { EnumUserRole, PrismaClient } from '@prisma/types'
import { hash } from 'bcryptjs'
import { parseSalt } from 'src/domains/auth/password.service'

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
    },
  })

  const partnerDB = await createOnDb(prisma, user.id)

  console.log(`Created partner "${partnerDB.name}" with email "${user.email}"`)
}

const createOnDb = async (prisma: PrismaClient, userId: string) => {
  return await prisma.partner.create({
    data: {
      name: 'Example Partner',
      logo: 'http://localhost:1231/assets/partner-logo.png',
      phoneNumber: `+${Math.floor(Math.random() * 10000000000)}`,
      webhookUrl: 'http://localhost:1231',
      userId: userId,
    },
  })
}
