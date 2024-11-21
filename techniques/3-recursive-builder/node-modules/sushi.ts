import { Simplify } from 'type-fest'
import { _ } from '../../lib/prelude.js'

export namespace Sushi {
  export const create = <$Context extends Context = ContextEmpty>(context?: $Context): Builder<$Context> => {
    context // do something
    return _
  }
}

interface Builder<$Context extends Context> {
  context: $Context
  salmon: <$Value extends string>(value: $Value) => Builder<
    Simplify<
      Omit<$Context, 'foo'> & {
        foo: [$Value, ...$Context['foo']]
      }
    >
  >
  tuna: <$Key extends string, $Value extends number>(key: $Key, value: $Value) => Builder<
    Simplify<
      Omit<$Context, 'bar'> & {
        bar: Simplify<$Context['bar'] & { [_ in $Key]: $Value }>
      }
    >
  >
}

interface ContextEmpty extends Context {
  foo: []
  bar: {}
}

interface Context {
  foo: string[]
  bar: Record<string, number>
}
