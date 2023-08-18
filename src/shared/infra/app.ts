import fastify from 'fastify'
import { ZodError } from 'zod'

import { env } from '../env'
import { routes } from '../infra/routes'
import { logger } from '@shared/helper/logger'

const app = fastify()

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation Error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    logger.error(error)
  } else {
    // TODO: fix me
    logger.error(error)
  }

  return reply.status(500).send({ message: 'Internal Server Error' })
})

export { app }
