import type { BatcherQueue } from './batcher-queue'

import type { BatcherQueueCallback } from './batcher-queue-callback'

export class TimeoutBatcherQueue implements BatcherQueue {
  private readonly delay: number

  public constructor(delay = 0) {
    this.delay = delay
  }

  public enqueue(callback: BatcherQueueCallback): void {
    setTimeout(callback, this.delay)
  }
}
