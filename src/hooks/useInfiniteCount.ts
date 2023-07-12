export function useInfiniteCount(value: number, max: number) {
  const increment = (value + 1) % max
  const decrement = (value - 1 + max) % max

  return { decrement, increment }
}
