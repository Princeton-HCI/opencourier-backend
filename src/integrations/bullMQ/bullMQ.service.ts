import { Injectable } from '@nestjs/common'
import { InjectQueue } from '@nestjs/bullmq'
import { Job, Queue } from 'bullmq'
import { MESSAGE_BUS_QUEUE } from '../../constants'
import dayjs from 'dayjs'

@Injectable()
export class BullMQService {
  constructor(@InjectQueue(MESSAGE_BUS_QUEUE) private queue: Queue) {}

  async addJob<T>(name: string, data: T, options?: { delay?: number; attempts?: number; backoff?: number }) {
    await this.queue.add(name, data, { ...options, removeOnComplete: true })
  }

  async addScheduledJob<T>(name: string, scheduleAt: Date, data: T) {
    const delay = dayjs(scheduleAt).diff(dayjs(), 'millisecond')
    await this.addJob(name, data, { delay, attempts: 3, backoff: 180000 })
  }

  async addRepeatableJob<T>(name: string, data: T, pattern: string) {
    await this.queue.add(name, data, { jobId: name, repeat: { pattern, jobId: name } })
  }

  async getAllJobs() {
    return this.queue.getJobs()
  }

  async getFailedJobs() {
    return this.queue.getJobs('failed')
  }

  async removeAllJobs() {
    const failedJobs = await this.getAllJobs()
    await Promise.all(failedJobs.map((job) => job.remove()))
  }

  async removeDelayedJobs<T>(filter: (job: Job<T, unknown, string>) => boolean) {
    const pendingJobs = await this.queue.getJobs('delayed')
    const jobs = pendingJobs.filter(filter)
    return Promise.all(jobs.map((job) => job.remove()))
  }

  async removeFailedJobs() {
    const failedJobs = await this.getFailedJobs()
    await Promise.all(failedJobs.map((job) => job.remove()))
  }
}
