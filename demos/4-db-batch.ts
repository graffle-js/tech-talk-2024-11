import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

const graffle = Graffle.create({
  schema,
})

const data = await graffle.query.$batch({
  battles: {
    __typename: true,
    ___on_BattleRoyale: {
      id: true,
    },
  },
  pokemons: {
    name: true,
    id: true,
  },
})

console.log(data)
