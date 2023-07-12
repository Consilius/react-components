import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import Box from './Box'
import Checkbox from './Checkbox'

interface OptionBoxProps {
  name: string
  label: string
  className?: string
  disabled?: boolean
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>, option: string) => void
  error?: boolean
}

const OptionBox = forwardRef<HTMLInputElement, OptionBoxProps>(
  ({ name, label, className, onChange, checked, error, disabled }, ref) => {
    return (
      <label htmlFor={name} className={twMerge(className, 'block cursor-pointer')}>
        <Box className="flex-row rounded-lg bg-gray-9/10 p-3 hover:bg-gray-9/20">
          <Checkbox
            ref={ref}
            name={name}
            disabled={disabled}
            label={label}
            checked={checked}
            error={error}
            onChange={(e) => onChange(e, name)}
          />
        </Box>
      </label>
    )
  }
)

OptionBox.displayName = 'OptionBox'

export default OptionBox
