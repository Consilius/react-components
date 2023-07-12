import { getMeridiemnTime } from '@/hooks/useMeridiemTime'
import { useOnClickOutside } from '@/hooks/useOnClickOutisde'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { useController } from 'react-hook-form'
import { Validation } from '../types'
import BaseTimePicker from './BaseComponents/BaseTimePicker'
import Field from './Field'
import { useFormError } from './utils'

interface TimePickerProps extends Omit<React.HTMLProps<HTMLInputElement>, 'defaultValue'> {
  name: string
  validation: Validation
  defaultValue?: string
  tooltip?: string | null
  hint?: string | null
}

const TimePicker = (props: TimePickerProps) => {
  const { name, validation, defaultValue, label, tooltip, hint } = props
  const errorMessage = validation?.errorMessage
  const rules = validation?.rules
  const error = useFormError(name, errorMessage)
  const { field } = useController({ name, defaultValue, rules })
  const [open, setOpen] = useState(false)
  const meridiemTime = getMeridiemnTime(field.value)

  const timepickerProps = {
    ...props,
    value: field.value,
    onChange: field.onChange,
    error,
    open,
  }

  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, () => setOpen(false))

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setOpen(true)
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <Field name={name} label={label} error={error} tooltip={tooltip} hint={hint}>
        <input
          ref={field.ref}
          id={name}
          name={name}
          value={meridiemTime}
          placeholder={props.placeholder}
          onChange={field.onChange}
          onFocus={onFocus}
          disabled={props.disabled}
          className={classNames(
            'text-gray-9 rounded-lg border p-3',
            'hover:border-gray-9/20 focus:border-gray-9/20',
            error ? 'border-red focus:border-red' : 'border-gray-9/10',
            open ? 'rounded-b-none' : 'rounded-b-lg'
          )}
        />
      </Field>
      <div
        className={classNames('border-gray-9/20 absolute z-10  w-full bg-white', {
          'rounded-lg rounded-t-none border ': open,
        })}
      >
        <BaseTimePicker {...timepickerProps} />
      </div>
    </div>
  )
}

export default TimePicker
