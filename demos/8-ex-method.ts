import { type Builder, type Context, createBuilderExtension, createExtension } from 'graffle/extensionkit'

const HelloWorld = createExtension({
  name: 'HelloWorld',
  normalizeConfig: (input?: { debug?: boolean }) => {
    return {
      debug: input?.debug ?? false,
    }
  },
  create: ({ config }) => {
    return {
      builder: createBuilderExtension<BuilderExtension>(({ client, property, path }) => {
        if (path.length !== 0) return

        if (property === 'hello') {
          return () => {
            if (config.debug) console.log('hello')
            return client.with({}) // todo .with({}) call should not be needed
          }
        }

        if (property === 'world') {
          return () => {
            if (config.debug) console.log('world')
            return client.with({})
          }
        }
      }),
    }
  },
})

interface BuilderExtension extends Builder.Extension {
  context: Context
  // @ts-expect-error params not type safe
  return: BuilderExtension_<this['params']>
}

interface BuilderExtension_<$Args extends Builder.Extension.Parameters<BuilderExtension>> {
  /**
   * Hello
   */
  hello: () => Builder.Definition.MaterializeWithNewContext<$Args['chain'], $Args['context']> // todo make chain already have this extension applied
  /**
   * World
   */
  world: () => Builder.Definition.MaterializeWithNewContext<$Args['chain'], $Args['context']>
}

//
//
//
// -----------------------------
//
//
//

import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

const graffle = Graffle
  .create({ schema })
  .use(HelloWorld({ debug: process.env['HW_DEBUG'] === 'true' }))

const pokemons = await graffle.hello().world().query.pokemons({ name: true })

console.log(pokemons)
