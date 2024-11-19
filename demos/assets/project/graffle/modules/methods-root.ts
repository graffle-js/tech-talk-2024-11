import type { InferResult } from 'graffle/schema'
import type * as $$Utilities from 'graffle/utilities-for-generated'
import * as $$Schema from './schema.js'
import * as $$SelectionSets from './selection-sets.js'

export interface QueryMethods<$Context extends $$Utilities.Context> {
  $batch: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutput<
        $Context,
        InferResult.OperationQuery<$$Utilities.AssertExtendsObject<$SelectionSet>, $$Schema.Schema<$Context['scalars']>>
      >
    >
  >
  __typename: () => Promise<
    $$Utilities.SimplifyDeep<
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        { __typename: 'Query' },
        '__typename'
      >
    >
  >

  battles: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query.battles<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationQuery<{ battles: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'battles'
      >
    >
  >

  beings: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query.beings<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationQuery<{ beings: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'beings'
      >
    >
  >

  pokemonByName: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query.pokemonByName<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationQuery<{ pokemonByName: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'pokemonByName'
      >
    >
  >

  pokemons: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query.pokemons<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationQuery<{ pokemons: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'pokemons'
      >
    >
  >

  trainerByName: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query.trainerByName<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationQuery<{ trainerByName: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'trainerByName'
      >
    >
  >

  trainers: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Query.trainers<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationQuery<{ trainers: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'trainers'
      >
    >
  >
}

export interface MutationMethods<$Context extends $$Utilities.Context> {
  $batch: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Mutation<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutput<
        $Context,
        InferResult.OperationMutation<
          $$Utilities.AssertExtendsObject<$SelectionSet>,
          $$Schema.Schema<$Context['scalars']>
        >
      >
    >
  >
  __typename: () => Promise<
    $$Utilities.SimplifyDeep<
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        { __typename: 'Mutation' },
        '__typename'
      >
    >
  >

  addPokemon: <$SelectionSet>(
    selectionSet: $$Utilities.Exact<$SelectionSet, $$SelectionSets.Mutation.addPokemon<$Context['scalars']>>,
  ) => Promise<
    $$Utilities.SimplifyDeepExcept<
      $Context['scalars']['typesDecoded'],
      $$Utilities.HandleOutputGraffleRootField<
        $Context,
        InferResult.OperationMutation<{ addPokemon: $SelectionSet }, $$Schema.Schema<$Context['scalars']>>,
        'addPokemon'
      >
    >
  >
}

export interface BuilderMethodsRoot<$Context extends $$Utilities.Context> {
  query: QueryMethods<$Context>
  mutation: MutationMethods<$Context>
}

export interface BuilderMethodsRootFn extends $$Utilities.TypeFunction.Fn {
  // @ts-expect-error parameter is Untyped.
  return: BuilderMethodsRoot<this['params']>
}
