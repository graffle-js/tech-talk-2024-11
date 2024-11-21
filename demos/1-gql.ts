import { Graffle } from 'graffle'

/**
 * 1. We construct a Graffle instance.
 */

const graffle = Graffle.create({
  schema: 'http://localhost:3000/graphql',
})

/**
 * 2. We construct a GraphQL document and send it.
 *
 * Here gql is used as a template literal tag. If used
 * as a function it is possible to send a document instance.
 *
 * Send is a separate method because it is possible to
 * pass variables and an operation name.
 */

const data = await graffle
  .gql`
    query {
      pokemons {
        name
        id
      }
    }
  `
  .send()

/**
 * 3. By default we receive just the data.
 * This can be changed by configuring the `output` settings.
 */

console.log(data)
