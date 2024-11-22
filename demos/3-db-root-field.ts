import { Graffle } from 'graffle'
import { assertType } from '../techniques/lib/assert-equal.js'
import { schema } from './assets/pokemon-schema/schema.js'

const graffle = Graffle.create({
  schema,
})

/**
 * 1. Now that we have the generated types,
 * we gain access to the query builder statically.
 *
 * There is no change in the runtime.
 * Internally a proxy instance is used to dynamically
 * construct a request from how the object is accessed and called.
 *
 * So, the role of the types is just to make usage of the document
 * builder type safe.
 */

const pokemons = await graffle.query.pokemons({
  /**
   * 2. Select scalar fields with boolean.
   */
  name: true,
  /**
   * 3. Alias a field selection.
   */
  id: ['id2', true],
  /**
   * 4. Alias a field selection multiple times.
   */
  hp: [['hp1', true], ['hp2', true]],
  /**
   * 5. Select Object types with plain objects.
   */
  trainer: {
    name: true,
    fans: {
      /**
       * 6. Directives. Their semantics are understood at the type level.
       */
      $include: false,
      id: true,
    },
  },
  /**
   * 7. Inline fragments.
   */
  ___: {
    $include: Math.random() > 0.5,
    defense: true,
  },
})

assertType<
  typeof pokemons,
  null | {
    name: string //         (2) Scalar selection.
    id2: string //          (3) Field via alias.
    hp1: number //          (4) Field 1/2 via alias.
    hp2: number //          (4) Field 2/2 via alias.
    trainer: null | { //    (5) Object selection.
      name: null | string
      // fans //            (6) Gone because of field directive.
    }
    defense?: number //     (7) Optional because of fragment directive.
  }[]
>()

const battles = await graffle.query.battles({
  /**
   * 8. Special __typename field.
   */
  __typename: true,
  /**
   * 9. Conditional Inline Fragments. On a union type here.
   */
  ___on_BattleRoyale: {
    date: true,
    winner: {
      name: true,
    },
  },
  ___on_BattleWild: {
    date: true,
    result: true,
  },
})

assertType<
  typeof battles,
  /**
   * 10. List results
   */
  Array<
    // 9
    | {
      __typename: 'BattleTrainer' // (8)
    }
    // 9
    | {
      __typename: `BattleRoyale` // (8)
      date: null | number
      winner: null | {
        name: null | string
      }
    }
    // 9
    | {
      __typename: `BattleWild` // (8)
      date: null | number
      result: 'pokemonsCaptured' | 'pokemonsDefeated' | 'trainerDefeated' | null
    }
  >
>()

/**
 * 11. Mutations.
 */
const deer = await graffle.mutation.addPokemon({
  /**
   * 11. Field Arguments.
   */
  $: {
    name: 'Deer',
    /**
     * 12. Enum arguments.
     * The $ prefix is needed to enable zero-runtime overhead mapping to GraphQL document.
     */
    $type: 'grass',
  },
  id: true,
})

console.log({
  pokemons,
  battles,
  deer,
})
