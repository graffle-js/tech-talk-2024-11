import { Sushi } from './node-modules/sushi.js'

/**
 * @remarks The following shows how using different extensions
 * on Example result in different API surfaces.
 *
 * In this example there is no runtime application of the extensions.
 * You can interpret this one of two ways:
 *
 * 1. Imagine Sushi was, this contrived example just omits it.
 *    Note: If Sushi was importing extensions it would negate the
 *    need for global augmentation.
 *
 * 2. Sushi is using a Proxy instance internally.
 *
 * Graffle applies both techniques (1) and (2).
 */

const sushi1 = Sushi.create('tuna')

sushi1.property1
sushi1.property2
sushi1.tuna() // Only available because `tuna` was used.

const sushi2 = Sushi.create('salmon')

sushi2.property1
sushi2.property2
sushi2.salmon() // Only available because `salmon` was used.

/**
 * @remarks In the following we can see that
 * it is a static type error to not
 * supply an extension name, or, to
 * supply an incorrect extension name.
 *
 * Exercise for the reader:
 *
 * When no extensions have been registered the error
 * message is misleading. There can never be a valid name.
 * Improve the error message for this edge case.
 */

Sushi.create() // Should Fail
Sushi.create('') // Should Fail
Sushi.create('wrong') // Should Fail
