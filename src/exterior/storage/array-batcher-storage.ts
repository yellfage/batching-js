import type { BatcherStorage } from './batcher-storage'

export class ArrayBatcherStorage<T> implements BatcherStorage<T> {
  public get size(): number {
    return this.array.length
  }

  private readonly array: T[]

  public constructor(value: Iterable<T> | ArrayLike<T> = []) {
    this.array = Array.from(value)
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.array[Symbol.iterator]()
  }

  public add(value: T): this {
    this.array.push(value)

    return this
  }

  public clear(): void {
    this.array.splice(0)
  }

  public values(): IterableIterator<T> {
    return this.array.values()
  }
}
