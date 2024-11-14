import { printSchema } from 'graphql'
import { schema } from './schema.js'
import { writeFile} from 'node:fs/promises'


const sdl = printSchema(schema)
await writeFile('./demos/assets/pokemon-schema/schema.graphql', sdl)
