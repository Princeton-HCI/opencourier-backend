import { Injectable } from '@nestjs/common'
import { EventBusMessage } from './models/EventBusMessage'

@Injectable()
export class EventBusService {
  private readonly handlers = new Map<string, Array<(message: EventBusMessage<any>) => Promise<boolean> | boolean>>()

  async emit<T>(eventName: string, data: T) {
    const handlers = this.handlers.get(eventName) ?? []
    const firstHandler = handlers[0]

    if (!firstHandler) {
      throw new Error(`No handlers for event: ${eventName}`)
    }

    // Rotate the listeners, the first listener is now at the end
    handlers.shift()
    handlers.push(firstHandler)
    this.handlers.set(eventName, handlers)

    return firstHandler({ eventName, data })
  }

  on<T>(eventName: string, newHandler: (message: EventBusMessage<T>) => Promise<boolean> | boolean) {
    const eventHandlers = this.handlers.get(eventName) ?? []
    eventHandlers.push(newHandler)
    this.handlers.set(eventName, eventHandlers)
  }
}
