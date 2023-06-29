import { DeferredPromise } from '../interior'

import type { BatcherCallback } from './batcher-callback'

import type { BatcherQueue } from './queue'

import type { BatcherStorage } from './storage'

export class Batcher<TValue, TResult> {
  private readonly storage: BatcherStorage<TValue>

  private readonly queue: BatcherQueue

  private readonly size: number

  private promise: DeferredPromise<TResult> | undefined

  public constructor(
    storage: BatcherStorage<TValue>,
    queue: BatcherQueue,
    size: number,
  ) {
    this.storage = storage

    this.queue = queue

    this.size = size
  }

  public add(value: TValue): this {
    this.storage.add(value)

    return this
  }

  public execute(callback: BatcherCallback<TValue, TResult>): Promise<TResult> {
    if (!this.promise) {
      this.promise = new DeferredPromise()

      const enqueue = (iterable: Iterable<TValue>): void => {
        this.queue.enqueue(async () => {
          try {
            const values = [...iterable]

            const currentValues = values.splice(0, this.size)

            const result = await callback(currentValues)

            if (values.length > 0) {
              enqueue(values)

              return
            }

            this.storage.clear()

            this.promise?.resolve(result)

            this.promise = undefined
          } catch (error: unknown) {
            this.storage.clear()

            this.promise?.reject(error)

            this.promise = undefined
          }
        })
      }

      enqueue(this.storage)
    }

    return this.promise.target
  }
}
