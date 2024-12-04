import clsx, { ClassValue } from 'clsx'
import { isNull, isUndefined } from 'lodash'
import { twMerge } from 'tw-merge'

export const isNullOrUndefined = (value: unknown): value is null | undefined =>
  isNull(value) || isUndefined(value)

export const isNotNullOrUndefined = <T>(
  value: T | undefined | null
): value is T => !isNullOrUndefined(value)

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
