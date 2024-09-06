export type Awaited<T> = T extends PromiseLike<infer U> ? U : T
export type AwaitedFn<T> = T extends (...args: any) => infer R ? Awaited<R> : T
