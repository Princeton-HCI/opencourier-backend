import { Config } from '@prisma/types'

export class ConfigEntity implements Config {
  key: string
  value: string
  type: string

  constructor(data: Config) {
    this.key = data.key
    this.value = data.value
    this.type = data.type
  }

  get normalizedValue() {
    switch (this.type) {
      case 'boolean':
        return this.value === 'true'
      case 'number':
        return Number(this.value)
      case 'object':
        try {
          return JSON.parse(this.value)
        } catch (e) {
          return this.value
        }
      case 'string':
      default:
        return this.value
    }
  }
}
