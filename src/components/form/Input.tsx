import classNames from 'classnames'
import { Controller } from 'react-hook-form'
import { Validation } from '../types'
import Field from './Field'
import { useFormError } from './utils'

interface InputProps extends Omit<React.HTMLProps<HTMLInputElement>, 'defaultValue'> {
  validation?: Validation
  defaultValue?: string | number | null
  name: string
  tooltip?: string | null
  hint?: string | null
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const Input = ({
  placeholder,
  hint,
  tooltip,
  className,
  disabled,
  type = 'text',
  name,
  validation,
  defaultValue,
  label,
  onFocus,
}: InputProps) => {
  const rules = validation?.rules
  const errorMessage = validation?.errorMessage
  const error = useFormError(name, errorMessage)

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field }) => {
        return (
          <Field name={name} label={label ?? name} error={error} hint={hint} tooltip={tooltip}>
            <input
              ref={field.ref}
              id={name}
              type={type}
              name={name}
              value={field.value}
              placeholder={placeholder}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onFocus={onFocus}
              disabled={disabled}
              className={classNames(
                'text-gray-9 rounded-lg border p-3',
                'hover:border-gray-9/20 focus:border-gray-9/20',
                error ? 'border-red focus:border-red' : 'border-gray-9/10',
                className
              )}
            />
          </Field>
        )
      }}
    />
  )
}

export default Input
