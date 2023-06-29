export type BatcherCallback<TValue, TResult> = (
  values: TValue[],
) => TResult | PromiseLike<TResult>
