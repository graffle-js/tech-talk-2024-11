import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

/**
 * 1. This time we pass a GraphQL schema instance to GraphQL.
 */

const graffle = Graffle.create({
  schema,
})

const data = await graffle.gql`
  query {
    pokemons {
      name
      id
    }
  }
`.send()

console.log(data)
