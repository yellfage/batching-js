/* eslint-disable prefer-destructuring */

import { Batcher } from './batcher'

import { TimeoutBatcherQueue, type BatcherQueue } from './queue'

import { ArrayBatcherStorage } from './storage'

import type { BatcherStorage } from './storage'

export class BatcherBuilder<TValue, TResult = void> {
  private size = Infinity

  private storage: BatcherStorage<TValue> = new ArrayBatcherStorage()

  private queue: BatcherQueue = new TimeoutBatcherQueue()

  public setStorage(storage: BatcherStorage<TValue>): this {
    this.storage = storage

    return this
  }

  public setQueue(queue: BatcherQueue): this {
    this.queue = queue

    return this
  }

  public setSize(size: number): this {
    this.size = size

    return this
  }

  public build(): Batcher<TValue, TResult> {
    const storage = this.storage

    const queue = this.queue

    const size = this.size

    return new Batcher(storage, queue, size)
  }
}
