import { TransformFnParams } from 'class-transformer'

export function csvToArray({ value }: TransformFnParams): string[] | undefined {
  if (Array.isArray(value)) {
    return value
  }
  if (typeof value === 'string') {
    const values = value
      .split(',')
      .map((v) => v.trim())
      .filter((v) => v)

    if (values.length !== 0) {
      return values
    }
  }
  return undefined
}
