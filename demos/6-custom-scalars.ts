import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

//
//
//
// ----------------------------
//
//
//

// First, observe how birthday is decoded as a string
// because there is no custom codec for the Date scalar.

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

// Now we'll add a custom codec for the Date scalar.
// We will use the method `scalar` to achieve this.

import { schemaMap } from './assets/graffle/_.js'

{
  // Notice that without the Schema Driven Data Map we cannot use it.
  // @ts-expect-error Missing schemaMap
  Graffle.create({ schema }).scalar()

  const graffle = Graffle
    .create({
      schema,
      // We import the Schema Driven Data Map from the generated code.
      // This marks the first time we're pulling using _runtime_ generated code.
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

  // Now observe how birthday is decoded as a JavaScript Date instance.

  // Graffle is also smart enough to decode aliases. That is achieved
  // by traversing the result data and the sent document together. We
  // can identify which fields in the result set came from aliases and
  // then, with the base field known, use the SDDM to discover if it is
  // a custom scalar and if so apply its codec's decoder.

  console.log(result)
}

//
//
//
// ----------------------------
//
//
//

// Finally we refactor our code by using the
// generated constructor. It is a preset variant that pre-applies
// custom scalar codecs both at the type and value level.
//
// We just define a conventional scalars module that the generator will
// integrate into the generated code.

// pnpm graffle --project ./demos/assets/project --schema ./demos/assets/pokemon-schema

import { Graffle as Graffle2 } from './assets/project/graffle/__.js'

{
  const graffle = Graffle2.create({ schema })

  const result = await graffle.query.pokemons({
    name: true,
    birthday: true,
  })

  // Same result!
  console.log(result)
}
