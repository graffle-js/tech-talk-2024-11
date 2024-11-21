import { assertType } from '../lib/assert-equal.js'

export interface TypeFunction {
  // This must be unknown to work with the `&` (intersection operator) below.
  parameters: unknown
  return: unknown
}

export namespace TypeFunction {
  export type Apply<
    $TypeFunction extends TypeFunction,
    $Arguments,
  > = ($TypeFunction & { parameters: $Arguments })['return']
}

//
//
//
// Minimal Example
//
//
//

interface Plus1 {
  parameters: string
  return: `${this['parameters']}+1`
}

assertType<TypeFunction.Apply<Plus1, '0'>, '0+1'>()
assertType<TypeFunction.Apply<Plus1, TypeFunction.Apply<Plus1, '0'>>, '0+1+1'>()

interface MergeA1 {
  parameters: {}
  return: this['parameters'] & { a: 1 }
}

assertType<TypeFunction.Apply<MergeA1, { b: 2 }>, { a: 1; b: 2 }>()
