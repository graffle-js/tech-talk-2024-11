import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

const graffle = Graffle.create({
  schema,
})

const data = await graffle.gql`
  {
    pokemons {
      name
      id
    }
  }
`.send()

console.log(data)
