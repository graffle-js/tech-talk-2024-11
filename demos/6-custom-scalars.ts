import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

//
//
//
// ----------------------------
//
//
//

{
  const graffle = Graffle.create({ schema })

  const result = await graffle.query.pokemons({
    name: true,
    birthday: true,
  })

  console.log(result)
}

//
//
//
// ----------------------------
//
//
//

import { schemaMap } from './assets/graffle/_.js'

{
  // @ts-expect-error Missing schemaMap
  Graffle.create({ schema }).scalar()

  const graffle = Graffle
    .create({
      schema,
      schemaMap,
    })
    .scalar('Date', {
      decode: (value) => new Date(value),
      encode: (value) => value.toISOString(),
    })

  const result = await graffle.query.pokemons({
    name: true,
    birthday: true,
  })

  console.log(result)
}

//
//
//
// ----------------------------
//
//
//

/**
 * pnpm graffle --project ./demos/assets/project --schema ./demos/assets/pokemon-schema
 */

import { Graffle as Graffle2 } from './assets/project/graffle/__.js'

{
  const graffle = Graffle2.create({ schema })

  const result = await graffle.query.pokemons({
    name: true,
    birthday: true,
  })

  console.log(result)
}
