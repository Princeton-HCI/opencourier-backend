import { EnumUserRole, PrismaClient } from '@prisma/types'
import { hash } from 'bcryptjs'
import { parseSalt } from 'src/domains/auth/password.service'

export async function seedAdminUser(prisma: PrismaClient) {
  if (!process.env.BCRYPT_SALT) {
    throw new Error('BCRYPT_SALT is not defined')
  }

  const userSalt = parseSalt(process.env.BCRYPT_SALT)

  console.log('Seeding admin user...')

  const email = `opencourier-admin@opencourier.com`
  const pwd = `adminUser@123`
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
      role: [EnumUserRole.ADMIN],
    },
  })

  console.log('Created admin:', user.email)
}
