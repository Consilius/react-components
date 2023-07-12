import { format, isValid, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import { useInfiniteCount } from './useInfiniteCount'

const standartTimeFormat = 'HH:mm:ss'
const meridiemTimeFormat = 'hh:mm:ss'

function useMeridiemTime(value: any, onChange: (value: any) => void) {
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('AM')

  const { hours, minutes } = parseTime(value)
  const { increment: nextHour, decrement: prevHour } = useInfiniteCount(hours, 24)
  const { increment: nextMinute, decrement: prevMinute } = useInfiniteCount(minutes, 60)

  const meridiemTime = getMeridiemnTime(value)
  const meridiemHours = getMeridiemHour(meridiemTime)
  const meridiemMinutes = getMeridiemMinutes(meridiemTime)

  const incrementHours = () => {
    onChange(encodeStandartTime(nextHour, minutes))
  }

  const decrementHours = () => {
    onChange(encodeStandartTime(prevHour, minutes))
  }

  const incrementMinutes = () => {
    onChange(encodeStandartTime(hours, nextMinute))
  }

  const decrementMinutes = () => {
    onChange(encodeStandartTime(hours, prevMinute))
  }

  const handleMeridiemChange = (newMeridiem: 'AM' | 'PM') => {
    setMeridiem(newMeridiem)

    if (newMeridiem === 'AM' && hours > 12) {
      onChange(encodeStandartTime(hours - 12, minutes))
    }

    if (newMeridiem === 'PM' && hours < 12) {
      onChange(encodeStandartTime(hours + 12, minutes))
    }
  }

  useEffect(() => {
    if (hours > 12) {
      setMeridiem('PM')
    } else {
      setMeridiem('AM')
    }
  }, [hours])

  return {
    meridiem,
    meridiemTime,
    meridiemHours,
    meridiemMinutes,
    incrementHours,
    decrementHours,
    incrementMinutes,
    decrementMinutes,
    handleMeridiemChange,
  }
}

export function parseTime(value: string) {
  if (!value || !validateTime(value)) return { hours: 0, minutes: 0, seconds: 0 }

  const [hours, minutes, seconds] = value.split(':')

  return {
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
  }
}

export function getMeridiemnTime(value: string) {
  // 12h time format
  if (!value || !validateTime(value)) return ''

  const [hours, minutes, seconds] = value.split(':')
  const isFull = hours && hours.length === 2 && minutes && minutes.length === 2 && seconds && seconds.length === 2
  const parsedDate = parse(value, standartTimeFormat, new Date())

  if (isValid(parsedDate) && isFull) {
    return format(parsedDate, meridiemTimeFormat)
  } else {
    return value
  }
}

export function getMeridiemHour(value: string) {
  const parsedDate = parse(value, meridiemTimeFormat, new Date())

  if (isValid(parsedDate)) {
    return format(parsedDate, 'hh')
  } else {
    return '00'
  }
}

export function getMeridiemMinutes(value: string) {
  const parsedDate = parse(value, meridiemTimeFormat, new Date())

  if (isValid(parsedDate)) {
    return format(parsedDate, 'mm')
  } else {
    return '00'
  }
}

export function validateTime(value: string) {
  const regExp = new RegExp('^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$')

  return regExp.test(value)
}

export function encodeStandartTime(hours: number, minutes: number) {
  // 24h time format
  return format(new Date(0, 0, 0, hours, minutes), standartTimeFormat)
}

export default useMeridiemTime
