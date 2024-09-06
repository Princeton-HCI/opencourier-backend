/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable unused-imports/no-unused-vars */
type NonFalsy<T> = T extends false | 0 | '' | null | undefined | 0n ? never : T

interface Array<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[]
}

interface ReadonlyArray<T> {
  filter(predicate: BooleanConstructor, thisArg?: any): NonFalsy<T>[]
}
