/**
 * ID: javascript.functional.matchEach.v1
 */

/**
 * A type-safety helper that forces defining mapping all values of a union to a value.
 */
export function matchEach<TUnion extends string | number, TReturns>(value: TUnion, mapping: Record<TUnion, TReturns>) {
  return mapping[value]
}
