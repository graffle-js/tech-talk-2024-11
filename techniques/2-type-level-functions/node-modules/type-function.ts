export interface TypeFunction {
  return: unknown
  parameters: unknown
}

export namespace TypeFunction {
  export type Apply<
    $TypeFunction extends TypeFunction,
    $Arguments,
  > = ($TypeFunction & { parameters: $Arguments })['return']
}
