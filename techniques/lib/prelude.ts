export const _ = undefined as any

export type Simplify<$T> = { [K in keyof $T]: $T[K] } & {}

export type Assert<$Constraint, $Value> = $Value extends $Constraint ? $Value : never
