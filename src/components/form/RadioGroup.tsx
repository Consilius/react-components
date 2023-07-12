import classNames from 'classnames'
import { forwardRef, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { Option } from '../types'
import Field from './Field'
import Radio from './Radio'

interface RadioGroupProps {
  options: Option[]
  tooltip?: string | null
  hint?: string | null
  className?: string
  disabled?: boolean
  type: 'choice' | 'boolean'
  error: string
  name: string
  label: string
  onChange: (value: string[] | null) => void
}

const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  ({ options, tooltip, className, type, onChange, error, name, label, disabled, hint }, ref) => {
    const { watch } = useFormContext()
    const formValue = watch(name)

    const handleOnChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
          onChange([e.target.value])
        } else {
          onChange([])
        }
      },
      [onChange]
    )

    const clear = useCallback(() => {
      onChange(null)
    }, [onChange])

    return (
      <Field name={name} error={error} label={label} tooltip={tooltip} className={className} hint={hint}>
        <div className={classNames('flex flex-col', type === 'boolean' && 'sm:flex-row')}>
          {options.map((option, i) => (
            <Radio
              ref={i === 0 ? ref : null}
              key={option.label}
              label={option.label}
              disabled={disabled}
              name={name}
              value={option.value}
              onChange={handleOnChange}
              checked={formValue === null ? false : formValue?.includes(option.value)}
              clear={clear}
            />
          ))}
        </div>
      </Field>
    )
  }
)

RadioGroup.displayName = 'RadioGroup'

export default RadioGroup
