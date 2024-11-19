import { addCleanupListener } from 'async-cleanup'
import type { GraphQLSchema } from 'graphql'
import { createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'

const port = 3000
export const url = new URL(`http://localhost:${String(port)}/graphql`)

export const serveSchema = async (input: { schema: GraphQLSchema; log?: boolean }) => {
  const { schema } = input
  const yoga = createYoga({
    schema,
    context: (initialContext) => {
      const tenant = initialContext.request.headers.get(`tenant`)
      return {
        tenant,
      }
    },
    logging: false,
    maskedErrors: false,
  })
  const server = createServer(yoga as any)
  let runState = true
  server.listen(port)
  await new Promise((resolve) =>
    server.once(`listening`, () => {
      resolve(undefined)
    })
  )
  if (input.log) {
    console.log(`Schema server is running at ${url.href}`)
  }

  const stop = async () => {
    if (!runState) return
    if (input.log) {
      console.log(`Stopping schema server at ${url.href}`)
    }
    runState = false
    await new Promise((resolve) => {
      server.close(resolve)
      setImmediate(() => {
        server.emit(`close`)
      })
    })
  }

  addCleanupListener(stop)

  return {
    yoga,
    server,
    port,
    url,
    stop,
  }
}

export type SchemaService = Awaited<ReturnType<typeof serveSchema>>
