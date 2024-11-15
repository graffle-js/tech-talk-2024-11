import { IsNever, UnionToTuple } from 'type-fest'
import { _ } from '../../lib/prelude.js'

type Sushi<$Extension extends Extension> = $Extension['mixin'] & {
  property1: string
  property2: number
}

export namespace Sushi {
  /**
   * Create an instance of Example.
   */
  // export const create = <$Name extends Registry.Names>(
  export const create = <$Name extends string>(
    name: Registry.ValidateName<$Name>,
  ): Sushi<Registry.Get<$Name>> => {
    name // do something with name
    return _
  }

  /**
   * Utilities to work with the registry.
   */
  export namespace Registry {
    export type ValidateName<$Name extends string> = $Name extends keyof _SushiGlobal.Registry ? $Name
      : `Exception: The name "${$Name}" is not a known extension name. Known names are: ${Tuple.Join<
        UnionToTuple<
          keyof _SushiGlobal.Registry
        >
      >}`

    // dprint-ignore
    export type Get<$Name extends string> =
      $Name extends keyof _SushiGlobal.Registry
        ? _SushiGlobal.Registry[$Name]
        : never

    export type Names = Names_<_SushiGlobal.Registry>

    // dprint-ignore
    type Names_<$Lookup extends object> =
      IsNever<keyof $Lookup> extends true
        ? 'Exception: Please install an extension to use Example!'
        : keyof $Lookup

    export type Lookup = Record<string, object>
  }
}

declare global {
  namespace _SushiGlobal {
    /**
     * @remarks Notice that there is no type safety on the registry properties.
     * Extensions must augment the interface correctly manually.
     * This is because augmentation only works with interfaces, not aliases, meaning we cannot
     * type an index e.g. Record<string, SOME_TYPE_HERE>.
     */
    export interface Registry {}
  }
}

interface Extension {
  /**
   * @remarks Notice there is the potential for more extension fields.
   * Currently our extension system will only mixin the `mixin` property into
   * the Sushi instance. We could imagine other "extensibility points" in the future.
   * that are "exposed" to the extension author via new properties here.
   *
   * In effect, we can think of properties here as being "hooks" into extending
   * various parts of the Sushi instance.
   */
  mixin: object
}

export namespace Tuple {
  export type Join<
    $Tuple extends string[],
    $Separator extends string = ', ',
  > = Join_<true, $Tuple, $Separator>

  // dprint-ignore
  type Join_<
    $First extends boolean,
    $Tuple extends string[],
    /**
     * @remarks Notice there is not default here.
     * Unlike the public facing `Join` type, this internal one
     * is optimized for correctness not ease of use. what that means
     * here is that we ensure that the recursive call is forced to
     * propagate the separator.
     *
     * A default here would allow the recursion to omit passing this
     * leading to a bug when the `Join` caller had passed a non-default
     * separator type.
     */
    $Separator extends string,
  > =
    $Tuple extends []
      ? ''
      : $Tuple extends [infer $Head extends string, ...infer $Tail extends string[]]
        ? `${$First extends true ? '' : $Separator}${$Head}${Join_<false, $Tail, $Separator>}`
        : never
}
