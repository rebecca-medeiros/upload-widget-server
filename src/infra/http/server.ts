import { fastifyCors } from '@fastify/cors'
import { fastify } from 'fastify'
import { env } from 'process'

const server = fastify()

server.register(fastifyCors, { origin: '*' })

console.log(env.DATABASE_URL)

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running at http://localhost:3333')
})
