import { forwardRef, useCallback } from 'react'
import FadeIn from '../animation/FadeIn'
import { useReplicaIndexContext } from '../recursive/Replicas'
import { getReplicaName } from '../recursive/utils'
import { Option } from '../types'
import Field from './Field'
import OptionBox from './OptionBox'

interface OptionGroupProps {
  options: Option[]
  name: string
  label: string
  tooltip?: string | null
  hint?: string | null
  disabled?: boolean
  className?: string
  error?: string
  onChange: (value: string[]) => void
  value: string[]
}

const OptionGroup = forwardRef<HTMLInputElement, OptionGroupProps>(
  ({ options = [], tooltip, className, name, label, error, value, onChange, disabled, hint }, ref) => {
    const replicaIndex = useReplicaIndexContext()
    const handleMultiValue = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
        if (e.target.checked) {
          onChange([...value, option])
        } else {
          onChange(value.filter((v: string) => v !== option))
        }
      },
      [value, onChange]
    )

    return (
      <Field name={name} label={label} error={error} tooltip={tooltip} className={className} hint={hint}>
        {options.map((option, i) => (
          <FadeIn key={String(option.value)}>
            <OptionBox
              ref={i === 0 ? ref : null}
              name={String(option.value)}
              label={option.label}
              disabled={disabled}
              className="py-2"
              onChange={handleMultiValue}
              checked={value.includes(getReplicaName(String(option.value), replicaIndex))}
            />
          </FadeIn>
        ))}
      </Field>
    )
  }
)

OptionGroup.displayName = 'OptionGroup'

export default OptionGroup
