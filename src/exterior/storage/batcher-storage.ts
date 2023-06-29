export interface BatcherStorage<T> {
  readonly size: number

  [Symbol.iterator](): IterableIterator<T>
  add(value: T): this
  clear(): void
  values(): IterableIterator<T>
}
