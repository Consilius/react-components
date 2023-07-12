import { getMeridiemnTime } from '@/hooks/useMeridiemTime'
import { useOnClickOutside } from '@/hooks/useOnClickOutisde'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { Validation } from '../types'
import BaseDatePicker from './BaseComponents/BaseDatePicker'
import BaseTimePicker from './BaseComponents/BaseTimePicker'
import Field from './Field'
import { useFormError } from './utils'

interface DateTimePickerProps extends Omit<React.HTMLProps<HTMLInputElement>, 'defaultValue'> {
  name: string
  validation: Validation
  defaultValue?: string | null
  skipFilterDays?: boolean
  tooltip?: string | null
  hint?: string | null
}

const DateTimePicker = ({
  name,
  validation,
  defaultValue,
  label,
  placeholder,
  disabled,
  skipFilterDays,
  tooltip,
  hint,
}: DateTimePickerProps) => {
  const [open, setOpen] = useState<'date' | 'time' | null>(null)
  const [time, setTime] = useState(defaultValue ? defaultValue?.split(',')[1] : '')
  const [date, setDate] = useState(defaultValue ? defaultValue?.split(',')[0] : '')

  const errorMessage = validation?.errorMessage
  const rules = validation?.rules
  const error = useFormError(name, errorMessage)
  const { field } = useController({ name, defaultValue, rules })

  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(null))

  const onFocusDate = () => {
    setOpen('date')
  }

  const onFocusTime = () => {
    setOpen('time')
  }

  const handleDateChange = (date: string) => {
    field.onChange(`${date}, ${time}`)
    setDate(date)
  }

  const handleTimeChange = (time: string) => {
    const meridiemTime = getMeridiemnTime(time)
    field.onChange(`${date}, ${meridiemTime}`)
    setTime(time)
  }

  return (
    <div className="relative" ref={ref}>
      <Field name={name} label={label ?? name} error={error} tooltip={tooltip} hint={hint}>
        <div className="flex">
          <input
            ref={field.ref}
            id={`${name}-date`}
            name={`${name}-date`}
            value={date}
            placeholder={placeholder}
            onChange={(e) => {
              setDate(e.target.value)
            }}
            onBlur={field.onBlur}
            onFocus={onFocusDate}
            disabled={disabled}
            className={classNames(
              'text-gray-9 flex-1 rounded-lg rounded-r-none border p-3',
              'hover:border-gray-9/20 focus:border-gray-9/20',
              error ? 'border-red focus:border-red' : 'border-gray-9/10',
              open ? 'rounded-b-none' : 'rounded-b-lg'
            )}
          />
          <input
            ref={field.ref}
            id={`${name}-time`}
            name={`${name}-time`}
            value={time}
            placeholder={placeholder}
            onChange={(e) => {
              setTime(e.target.value)
            }}
            onBlur={field.onBlur}
            onFocus={onFocusTime}
            disabled={disabled}
            className={classNames(
              'text-gray-9 flex-1 rounded-lg rounded-l-none border p-3',
              'hover:border-gray-9/20 focus:border-gray-9/20',
              error ? 'border-red focus:border-red' : 'border-gray-9/10',
              open ? 'rounded-b-none' : 'rounded-b-lg'
            )}
          />
        </div>
      </Field>
      <div
        className={classNames(
          'hover:border-gray-9/20 focus:border-gray-9/20 absolute  z-10 w-full bg-white',
          open ? 'border-gray-9/20 rounded-lg rounded-t-none border' : 'border-gray-9/10 rounded-t-lg'
        )}
      >
        {open && (
          <>
            {open === 'date' && (
              <div className="m-4">
                <BaseDatePicker
                  key={field.name}
                  name={field.name}
                  skipFilterDays={skipFilterDays}
                  label={label}
                  value={date}
                  onChange={handleDateChange}
                />
              </div>
            )}
            {open === 'time' && (
              <BaseTimePicker
                key={field.name}
                name={field.name}
                value={time}
                onChange={handleTimeChange}
                open={open === 'time'}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default DateTimePicker
