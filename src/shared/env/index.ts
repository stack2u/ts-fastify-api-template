import 'dotenv/config'

import { z } from 'zod'

import { logger } from '@shared/helper/logger'
import { AppError } from '../error/AppError'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
  LOGGER_LEVEL: z.string().default('info'),
  DATABASE_URL: z.string().default(''),
  AUTH_TOKEN_SECRET: z.string(),
  AUTH_TOKEN_EXPIRATION: z.string().default('9999 minutes'),
  MAILER_TOKEN_SECRET: z.string(),
  MAILER_EMAIL_BASE_URL: z.string(),
  MAILER_HOST: z.string(),
  MAILER_SECURE: z.string(),
  MAILER_PORT: z.string(),
  MAILER_AUTH_USER: z.string(),
  MAILER_AUTH_PSW: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  logger.error('Invalid environment variable', _env.error.format())

  throw new AppError('❌ Invalid environment variables')
}

export const env = _env.data
