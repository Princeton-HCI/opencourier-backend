import { EnumUserRole, PrismaClient } from '@prisma/types'
import { hash } from 'bcryptjs'

const TEST_PHONE_NUMBER = '5005550006'

async function main() {
  const db = new PrismaClient()

  const existingUser = await db.user.findMany({
    where: {
      courier: {
        phoneNumber: TEST_PHONE_NUMBER,
      },
    },
    include: {
      courier: true,
    },
  })

  if (existingUser.length !== 0) {
    console.log('courier account exists exiting')
    return
  }

  await db.user.create({
    data: {
      email: 'hello@example.com',
      password: await hash('Qatest12', '$2b$10$nBjwMdYNL0M27A6JBaeXhe'),
      role: [EnumUserRole.COURIER],
      courier: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: TEST_PHONE_NUMBER,
          stripeAccountId: '',
        },
      },
    },
  })
  console.log('created courier')
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main()
