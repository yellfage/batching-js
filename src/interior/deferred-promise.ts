export class DeferredPromise<TResult = unknown> {
  public target: Promise<TResult>

  public resolve: (value: PromiseLike<TResult> | TResult) => void

  public reject: (reason?: unknown) => void

  public constructor() {
    this.target = new Promise((resolve, reject) => {
      this.resolve = resolve

      this.reject = reject
    })
  }
}
