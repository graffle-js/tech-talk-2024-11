import { TypeFunction } from '../../2-type-level-functions/type-function.js'
import { _, Assert, Simplify } from '../../lib/prelude.js'

export interface Sushi<
  $Config extends Sushi.Config = Sushi.DefaultConfig,
> {
  config: $Config
  // dprint-ignore
  use: <$Extension extends Sushi.Extension>
    (extension: $Extension) =>
      Sushi<
        // todo remark on Simplify
        Simplify<
          // todo remark on Assert
          Assert<
            Sushi.Config,
            TypeFunction.Apply<
              $Extension,
              $Config
            >
          >
        >
      >
}

export namespace Sushi {
  export const create = <const $Config extends Config = DefaultConfig>(config?: $Config): Sushi<$Config> => {
    // Do something here.
    config
    return _
  }

  export interface Config {
    thingMode: 'red' | 'blue'
    redThings: string[]
    blueThings: string[]
  }

  export interface DefaultConfig extends Config {
    thingMode: 'red'
    redThings: []
    blueThings: []
  }

  export interface Extension extends TypeFunction {
    <$Config extends Config>(config: $Config): Config
  }
}
