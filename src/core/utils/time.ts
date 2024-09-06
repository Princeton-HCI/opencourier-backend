import dayjs from 'dayjs'
import dayjsTimezone from 'dayjs/plugin/timezone'
import dayjsUtc from 'dayjs/plugin/utc'
import dayjsWeekday from 'dayjs/plugin/weekday'
import { DateTimeType, ScheduleTime } from '../../types'

dayjs.extend(dayjsUtc)
dayjs.extend(dayjsTimezone)
dayjs.extend(dayjsWeekday)

export { dayjs }

export function dateTimeIsInThePast(dateTime: DateTimeType, tz: string) {
  const nowJs = dayjs().tz(tz)
  return dayjs(dateTimeToDate(dateTime, tz)).tz(tz).isBefore(nowJs)
}

export type TimeLapse = {
  open: ScheduleTime
  close: ScheduleTime
}

// Minute of day format makes comparison easy
export function scheduleTimeToMinuteOfDay(time: ScheduleTime): number {
  return time.hour * 60 + time.minute
}

function dayJsTimeToMinuteOfDay(timeJs: dayjs.Dayjs): number {
  return timeJs.hour() * 60 + timeJs.minute()
}

export function endOfDay(): Date {
  // TODO this is a hack that works as long as we are in the US. We pick the westernmost point in the US
  // and use the end of day there as the "end of day in the US".
  const PACIFIC = 'America/Los_Angeles'
  return dayjs().tz(PACIFIC).endOf('day').toDate()
}

export function centuryFromNow(): Date {
  return dayjs().add(100, 'year').toDate()
}

export function convertToDate(value: string | null | undefined): Date | null | undefined {
  if (value === undefined) {
    return undefined
  }
  if (value === null) {
    return null
  }
  const valueJs = dayjs(value)
  if (!valueJs.isValid()) {
    throw new Error('Invalid date format')
  }
  return valueJs.toDate()
}

export function hourAndMinuteToDate(hour: number, minute: number): Date {
  return dayjs.utc().hour(hour).minute(minute).second(0).toDate()
}

export function dbTimeToScheduleTime(dbTime: Date): ScheduleTime {
  const utc = dayjs(dbTime).utc()
  return {
    hour: utc.hour(),
    minute: utc.minute(),
  }
}

export function scheduleTimeToDbTime(time: ScheduleTime): Date {
  return dayjs().utc().hour(time.hour).minute(time.minute).second(0).millisecond(0).toDate()
}

export function dateToDateTime(dbTime: Date, tz: string): DateTimeType {
  const date = dayjs(dbTime).tz(tz)

  return {
    year: date.year(),
    month: date.month(),
    day: date.date(),
    hour: date.hour(),
    minute: date.minute(),
  }
}

export function dateTimeToDate(dateTime: DateTimeType, tz: string): Date {
  const { year, month, day, hour, minute } = dateTime
  return dayjs().tz(tz).year(year).month(month).date(day).hour(hour).minute(minute).second(0).millisecond(0).toDate()
}

export function dateTimeToDayJs(dateTime: DateTimeType, tz: string): dayjs.Dayjs {
  const { year, month, day, hour, minute } = dateTime
  return dayjs().tz(tz).year(year).month(month).date(day).hour(hour).minute(minute).second(0).millisecond(0)
}

export function areScheduleTimesOverlapping(
  timeLapse1: TimeLapse,
  timeLapse2: TimeLapse,
  opts?: { inclusive?: boolean }
): boolean {
  const start1 = scheduleTimeToMinuteOfDay(timeLapse1.open)
  const end1 = scheduleTimeToMinuteOfDay(timeLapse1.close)
  const start2 = scheduleTimeToMinuteOfDay(timeLapse2.open)
  const end2 = scheduleTimeToMinuteOfDay(timeLapse2.close)

  if (opts?.inclusive) return start1 <= end2 && end1 >= start2
  return start1 < end2 && end1 > start2
}

/**
 * Combines two time lapses, represented by `TimeLapse` objects, and returns a new time lapse that encompasses their overlapping periods.
 * If the provided time lapses do not overlap, it returns null.
 */
function addTimeLapses(timeLapse1: TimeLapse, timeLapse2: TimeLapse): TimeLapse | null {
  if (areScheduleTimesOverlapping(timeLapse1, timeLapse2, { inclusive: true })) {
    const start1 = scheduleTimeToMinuteOfDay(timeLapse1.open)
    const end1 = scheduleTimeToMinuteOfDay(timeLapse1.close)
    const start2 = scheduleTimeToMinuteOfDay(timeLapse2.open)
    const end2 = scheduleTimeToMinuteOfDay(timeLapse2.close)
    const start = dayjs().utc().startOf('day').set('minutes', Math.min(start1, start2))
    const end = dayjs().utc().startOf('day').set('minutes', Math.max(end1, end2))

    return {
      open: { hour: start.hour(), minute: start.minute() },
      close: { hour: end.hour(), minute: end.minute() },
    }
  }

  return null
}

/**
 * Generates the union of overlapping time lapses from an array of `TimeLapse` objects.
 * It iterates through the provided time lapses and combines overlapping ones into a unified time lapse.
 * The result is an array of non-overlapping time lapses.
 *
 * @param timeLapses - An array of `TimeLapse` objects to be processed.
 * @returns An array of non-overlapping `TimeLapse` objects representing the union of overlapping periods.
 */
export function generateTimeLapsesUnion(timeLapses: TimeLapse[]): TimeLapse[] {
  const lapses: TimeLapse[] = []

  for (const timeLapse of timeLapses) {
    let added = false

    for (let i = 0; i < lapses.length; i++) {
      const lapse = lapses[i]

      if (lapse && areScheduleTimesOverlapping(lapse, timeLapse, { inclusive: true })) {
        const union = addTimeLapses(lapse, timeLapse)
        if (union) {
          lapses[i] = union
          added = true
          break
        }
      }
    }

    if (!added) {
      lapses.push({ open: timeLapse.open, close: timeLapse.close })
    }
  }

  return lapses
}

export function lapseIsInTheFuture(lapse: TimeLapse, tz: string): boolean {
  const nowJs = dayjs().tz(tz)
  const nowMins = scheduleTimeToMinuteOfDay({ hour: nowJs.hour(), minute: nowJs.minute() })
  return scheduleTimeToMinuteOfDay(lapse.close) > nowMins
}

export function lapseIsPartiallyInThePast(lapse: TimeLapse, tz: string): boolean {
  const nowJs = dayjs().tz(tz)
  const nowMins = scheduleTimeToMinuteOfDay({ hour: nowJs.hour(), minute: nowJs.minute() })
  return nowMins > scheduleTimeToMinuteOfDay(lapse.open) && nowMins < scheduleTimeToMinuteOfDay(lapse.close)
}

function roundToNearest15Minutes(time: { hour: number; minute: number }): { hour: number; minute: number } {
  const roundedMinutes = Math.round(time.minute / 15) * 15
  const additionalHours = Math.floor(roundedMinutes / 60)
  return {
    hour: (time.hour + additionalHours) % 24,
    minute: roundedMinutes % 60,
  }
}

/**
 * Adjusts the given time lapse if it is partially in the past.
 * If the open time of the lapse has already occurred,
 * the open time is set to the nearest 15-minute interval in the future.
 */
export function shrinkLapse(lapse: TimeLapse, tz: string): TimeLapse {
  if (!lapseIsPartiallyInThePast(lapse, tz)) return lapse
  const nowJs = dayjs().tz(tz)
  const newOpen = roundToNearest15Minutes({ hour: nowJs.hour(), minute: nowJs.minute() })
  return { open: newOpen, close: lapse.close }
}

export function getTimeRemainingFor(dateTime: DateTimeType, tz: string) {
  const { year, month, day, hour, minute } = dateTime
  const now = dayjs().tz(tz)
  const date = dayjs().tz(tz).year(year).month(month).date(day).hour(hour).minute(minute)

  const daysLeft = date.diff(now, 'days')
  const hoursLeft = date.diff(now, 'hours')
  const minutesLeft = date.diff(now, 'minutes')

  let description = ''
  if (daysLeft > 0) {
    description += `in ${daysLeft} day${daysLeft > 1 ? 's' : ''}`
  } else if (hoursLeft > 0) {
    description += `in ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''}`
  } else if (minutesLeft > 0) {
    description += `in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}`
  }

  return description
}

export function addHours(dateTime: Date, hours: number): Date {
  const date = dayjs(dateTime).add(hours, 'hours')

  return date.toDate()
}

export function addMinutes(dateTime: Date, minutes: number): Date {
  const date = dayjs(dateTime).add(minutes, 'minutes')

  return date.toDate()
}
