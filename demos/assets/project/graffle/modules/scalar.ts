import type * as $$Utilities from 'graffle/utilities-for-generated'

import * as CustomScalars from '../../scalars.js'

export * from '../../scalars.js'
export { Date } from '../../scalars.js'
//
//
//
//
// CUSTOM SCALAR TYPE
// DATE
// --------------------------------------------------------------------------------------------------
//                                                Date
// --------------------------------------------------------------------------------------------------
//
//

export type Date = typeof CustomScalars.Date
// Without this we get error:
// "Exported type alias 'DateDecoded' has or is using private name 'Date'."
type Date_ = typeof CustomScalars.Date
export type DateDecoded = $$Utilities.Schema.Scalar.GetDecoded<Date_>
export type DateEncoded = $$Utilities.Schema.Scalar.GetEncoded<Date_>

export * from 'graffle/generator-helpers/standard-scalar-types'

//
//
//
//
//
//
// ==================================================================================================
//                                              Registry
// ==================================================================================================
//
//
//
//
//
//

export const $registry = {
  map: {
    Date: Date,
  },
} as $Registry

export type $Registry = $$Utilities.Schema.Scalar.Registry<
  {
    Date: Date_
  },
  $$Utilities.Schema.Scalar.GetEncoded<Date_>,
  $$Utilities.Schema.Scalar.GetDecoded<Date_>
>
