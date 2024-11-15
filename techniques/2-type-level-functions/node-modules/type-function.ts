export interface TypeFunction {
  // todo mention these must be unknown to work with the `&` (intersection operator) below
  return: unknown
  parameters: unknown
}

export namespace TypeFunction {
  export type Apply<
    $TypeFunction extends TypeFunction,
    $Arguments,
  > = ($TypeFunction & { parameters: $Arguments })['return']
}
