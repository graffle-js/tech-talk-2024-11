import { Graffle } from 'graffle'
import { schema } from './assets/pokemon-schema/schema.js'

const graffle = Graffle.create({
  schema,
})

const data = await graffle
  .document({
    mutation: {
      addMyPokemon: {
        addPokemon: {
          $: {
            name: 'Yolo',
            $type: 'fire',
            hp: 1000,
          },
          id: true,
        },
      },
    },
    query: {
      getTrainers: {
        trainers: {
          name: true,
        },
      },
    },
  })
  /**
   * Typesafe operation selection.
   * Change selection to change return type.
   */
  .run('getTrainers')

console.log(data)
