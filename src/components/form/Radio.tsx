import { forwardRef } from 'react'

interface RadioProps {
  label: string
  name: string
  value: string | null
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  clear: () => void
  checked: boolean
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, name, value, onChange, checked, clear, disabled }, ref) => {
    const id = `${name}:${value}`

    return (
      <div className="flex">
        <label
          htmlFor={id}
          className="bg-gray-9/10 text-gray-9 my-1 ml-2 flex-1 cursor-pointer select-text rounded-lg p-3"
        >
          <div className="flex items-center">
            <input
              id={id}
              ref={ref}
              disabled={disabled}
              checked={checked}
              name={name}
              type="radio"
              onChange={onChange}
              value={value || ''}
              className="border-gray-2 relative h-4 w-4 appearance-none rounded-full border checked:border-black focus:ring-1"
            />
            <span className="ml-2 flex-1" dangerouslySetInnerHTML={{ __html: label }} />
          </div>
        </label>
        {checked && (
          <button
            className="bg-gray-9/10 text-gray-9 my-1 ml-2 cursor-pointer select-text rounded-lg p-3"
            type="button"
            onClick={clear}
          >
            clear
          </button>
        )}
      </div>
    )
  }
)

Radio.displayName = 'Radio'

export default Radio
