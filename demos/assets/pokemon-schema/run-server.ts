import { serveSchema } from '../lib/serveSchema.js'
import { schema } from './schema.js'

await serveSchema({ schema, log: true })
