import { Injectable } from '@nestjs/common'
import { RedisClient } from '../redis/models/RedisClient'

@Injectable()
export class CacheService {
  constructor(private readonly redisClient: RedisClient) {}

  public async save<T>(key: string, value: T, ttlSeconds: number) {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttlSeconds)
  }

  public async delete(key: string) {
    await this.redisClient.del(key)
  }

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.redisClient.get(key)
    return value === null ? null : JSON.parse(value) // might throw an exception if not valid JSON
  }

  public async getOrDefault<T>(key: string, defValue: T): Promise<T> {
    const value = await this.redisClient.get(key)
    return value === null ? defValue : JSON.parse(value) // might throw an exception if not valid JSON
  }
}
