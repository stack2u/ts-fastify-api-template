import { AppError } from '@shared/error/AppError'
import { UsersRepository } from '../repositories/users-repository'
import { compareHashPasswords } from '@shared/helper/encrypt'

interface IProps {
  email: string
  password: string
}

export class LoginUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ email, password }: IProps) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    const isPasswordMatch = await compareHashPasswords(password, user.password)
    if (!isPasswordMatch) {
      throw new AppError('Invalid credentials', 401)
    }

    return { user }
  }
}
