import type { BatcherStorage } from './batcher-storage'

export class SetBatcherStorage<T> implements BatcherStorage<T> {
  public get size(): number {
    return this.set.size
  }

  private readonly set: Set<T>

  public constructor(value?: Iterable<T>) {
    this.set = new Set(value)
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.set[Symbol.iterator]()
  }

  public add(value: T): this {
    this.set.add(value)

    return this
  }

  public clear(): void {
    this.set.clear()
  }

  public values(): IterableIterator<T> {
    return this.set.values()
  }
}
