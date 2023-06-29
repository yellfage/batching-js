import type { BatcherQueueCallback } from './batcher-queue-callback'

export interface BatcherQueue {
  enqueue(callback: BatcherQueueCallback): void
}
