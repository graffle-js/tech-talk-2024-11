import { Graffle } from 'graffle'

const graffle = Graffle.create({
  schema: 'http://localhost:3000/graphql',
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
