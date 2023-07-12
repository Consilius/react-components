import classNames from 'classnames'
import { forwardRef } from 'react'

interface CheckboxProps {
  label: string
  name: string
  disabled?: boolean
  errorMessage?: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, name, disabled, checked, onChange, error }, ref) => {
    return (
      <div className="flex items-center">
        <input
          ref={ref}
          id={name}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          className={classNames(
            checked ? 'checked border-black' : ' ',
            error ? 'border-red focus:border-red' : '',
            disabled ? 'cursor-default' : '',
            'relative box-content h-4 w-4 cursor-pointer appearance-none rounded-[4px] border border-gray-2 bg-white',
            'focus:black  checked:bg-black focus:ring-1'
          )}
        />
        <label
          htmlFor={name}
          dangerouslySetInnerHTML={{ __html: label }}
          className={classNames(
            'ml-2 flex-1 cursor-pointer select-text text-gray-9',
            error ? 'text-red' : '',
            disabled ? 'cursor-default text-gray-2' : ''
          )}
        />
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
