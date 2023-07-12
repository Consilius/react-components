import { useOnClickOutside } from '@/hooks/useOnClickOutisde'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { Validation } from '../types'
import BaseDatePicker from './BaseComponents/BaseDatePicker'
import Input from './Input'

interface DatePickerProps {
  name: string
  label?: string
  placeholder?: string
  errorMessage?: string
  defaultValue?: string | null
  tooltip?: string | null
  hint?: string | null
  disabled?: boolean
  className?: string
  excludeDates?: Date[]
  highlightDates?: Array<Date | { [key: string]: Date[] }>
  skipFilterDays?: boolean
  validation?: Validation
  isStatic?: boolean
  selectedFirstDate?: string
}

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { name, defaultValue = '', isStatic = false } = props
  const [open, setOpen] = useState(false)
  const { field } = useController({ name, defaultValue })

  const datepickerProps = {
    ...props,
    value: field.value,
    onChange: field.onChange,
  }

  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setOpen(true)
  }

  const dynamicDatepickerProps = {
    ...props,
    onFocus,
  }

  return (
    <>
      {isStatic ? (
        <div className={classNames('flex flex-col gap-4', { 'pointer-events-none opacity-50': props.disabled })}>
          <Input {...props} />
          <BaseDatePicker {...datepickerProps} />
        </div>
      ) : (
        <div className="relative" ref={ref}>
          <Input {...dynamicDatepickerProps} className={open ? 'rounded-b-none' : 'rounded-b-lg'} />
          {open && (
            <div
              className={classNames('border-gray-9/20 absolute  z-10 w-full rounded-lg rounded-t-none border bg-white')}
            >
              <div className="m-4">
                <BaseDatePicker {...datepickerProps} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default DatePicker
