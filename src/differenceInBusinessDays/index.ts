import isValid from '../isValid/index.js'
import isWeekend from '../isWeekend/index.js'
import toDate from '../toDate/index.js'
import differenceInCalendarDays from '../differenceInCalendarDays/index.js'
import addDays from '../addDays/index.js'
import isSameDay from '../isSameDay/index.js'
import toInteger from '../_lib/toInteger/index.js'

/**
 * @name differenceInBusinessDays
 * @category Day Helpers
 * @summary Get the number of business days between the given dates.
 *
 * @description
 * Get the number of business day periods between the given dates.
 * Business days being days that arent in the weekend.
 * Like `differenceInCalendarDays`, the function removes the times from
 * the dates before calculating the difference.
 *
 * @param dateLeft - The later date
 * @param dateRight - The earlier date
 * @returns The number of business days
 *
 * @example
 * // How many business days are between
 * // 10 January 2014 and 20 July 2014?
 * const result = differenceInBusinessDays(
 *   new Date(2014, 6, 20),
 *   new Date(2014, 0, 10)
 * )
 * //=> 136
 */
export default function differenceInBusinessDays(
  dirtyDateLeft: Date | number,
  dirtyDateRight: Date | number
) {
  const dateLeft = toDate(dirtyDateLeft)
  const dateRight = toDate(dirtyDateRight)

  if (!isValid(dateLeft) || !isValid(dateRight)) return new Date(NaN)

  const calendarDifference = differenceInCalendarDays(dateLeft, dateRight)
  const sign = calendarDifference < 0 ? -1 : 1

  const weeks = toInteger(calendarDifference / 7)

  const result = weeks * 5
  dateRight = addDays(dateRight, weeks * 7)

  // the loop below will run at most 6 times to account for the remaining days that don't makeup a full week
  while (!isSameDay(dateLeft, dateRight)) {
    // sign is used to account for both negative and positive differences
    result += isWeekend(dateRight) ? 0 : sign
    dateRight = addDays(dateRight, sign)
  }

  return result === 0 ? 0 : result
}