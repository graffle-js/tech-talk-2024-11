import { _ } from '../../lib/prelude.js'
import { Sushi } from './sushi.js'

// dprint-ignore
export interface Tuna<$TunaConfig extends Tuna.Config> extends Sushi.Extension {
  /**
   * @remarks
   * This Sushi extension's return type _depends_ on the state of the Sushi config.
   * This requirement is why Sushi extensions must be type-level functions.
   */
  // todo explain why
  // @ts-expect-error
  return: Return<this['parameters'], $TunaConfig>
}

// dprint-ignore
type Return<$SushiConfig extends Sushi.Config, $TunaConfig extends Tuna.Config> =
  // $Config
  /**
   * The "magic" happens via `this`. It reflects upon the state of **this** type
   * and finds the **current** state of `parameters` (which has been set by `Sushi`
   * via the `TypeFunction.Apply` utility)
   */
  $SushiConfig extends { thingMode: 'red' }
    /**
     * @remarks
     * In order to append to an array property we omit it from the object then re-add that property
     * with our new value appended to the array.
     *
     * We cannot just straight up intersect e.g. `{x:[1]} & {x:[2]}` to achieve `{x:[1,2]}`
     */
    ? & Omit<$SushiConfig, 'redThings'>
      & {
          redThings: [
            ...$SushiConfig['redThings'],
            $TunaConfig['spicy'] extends true
              ? 'TunaSpicy'
              : 'Tuna'
          ]
        }
    : & Omit<$SushiConfig, 'blueThings'>
      & {
          blueThings: [
            ...$SushiConfig['blueThings'],
            $TunaConfig['spicy'] extends true
              ? 'TunaSpicy'
              : 'Tuna'
          ]
      }

export namespace Tuna {
  export interface Config {
    spicy: boolean
  }
  export interface DefaultConfig extends Config {
    spicy: false
  }
  export const create = <$Config extends Config = DefaultConfig>(config?: $Config): Tuna<$Config> =>
    ((sushiConfig) => {
      // Do something here.
      config
      sushiConfig
      return _
      /**
       * @remarks
       * We have to cast here because TypeScript expects "return" and "parameters" properties.
       * However, at the value level, we don't need these properties. So we cast to `Tuna` to
       * satisfy TypeScript.
       *
       * Another approach could be a `Sushi.create` higher order helper function that hides this
       * type cast from us: `Sushi.create((config) =>  ... )`. At the value level, it would just
       * be a passthrough (aka. identity) function.
       */
    }) as Tuna<$Config>
}
