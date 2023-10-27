import { Users, Tokens } from '@prisma/client'

export interface UsersRepository {
  findByEmail(email: string): Promise<Users | null>
  createUsers(data: Omit<Users, 'id'>): Promise<Users>
  updatePasswordAndDeleteToken(id: string, password: string): Promise<Users>
  getUserToken(token: string): Promise<Tokens | null>
  saveTokenInDb(token: string, id_user: string): Promise<void>
}
