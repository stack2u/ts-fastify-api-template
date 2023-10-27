import { prisma } from '@config/prisma'

import { UsersRepository } from '../users-repository'
import { Users } from '@prisma/client'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: { email },
    })

    return user
  }

  async createUsers(data: Omit<Users, 'id'>) {
    const user = await prisma.users.create({
      data,
    })

    return user
  }

  async updatePasswordAndDeleteToken(id: string, password: string) {
    const user = await prisma.users.update({
      data: {
        password,
      },
      where: {
        id,
      },
    })

    if (id) {
      await prisma.tokens.deleteMany({
        where: {
          user_id: id,
        },
      })
    }

    return user
  }

  async getUserToken(token: string) {
    const userToken = await prisma.tokens.findFirst({
      where: {
        token,
      },
    })

    return userToken
  }

  async saveTokenInDb(token: string, user_id: string) {
    await prisma.tokens.create({
      data: {
        token,
        user_id,
      },
    })
  }
}
