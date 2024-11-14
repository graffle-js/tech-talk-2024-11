import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

const graffle = Graffle.create({
  schema,
})

const data = await graffle.query.pokemons({
  name: true,
  id: true,
})

console.log(data)
