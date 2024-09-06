import { Abstract, Type } from '@nestjs/common'

export function useProvideClass<P, C extends P>(provide: Abstract<P>, useClass: Type<C>) {
  return { provide, useClass }
}

export function useProvideExisting<P, C extends P>(provide: Abstract<P>, useExisting: Type<C>) {
  return { provide, useExisting }
}
