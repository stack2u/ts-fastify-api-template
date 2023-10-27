import { FastifyInstance } from 'fastify'

// import { ensureAuthentication } from '@shared/middlewares/ensure-authentication'

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/',
    // {
    //   onRequest: ensureAuthentication,
    // },
    () => console.log('Hello World'),
  )
}
