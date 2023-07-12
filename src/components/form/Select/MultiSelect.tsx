import { useSelect } from '@/components/form/Select/useSelect'
import { Category, Option, Validation } from '@/components/types'
import classNames from 'classnames'
import { useCallback } from 'react'
import { useController } from 'react-hook-form'
import Box from '../Box'
import Field from '../Field'
import { useFormError } from '../utils'
import ComboBox from './ComboBox'

interface MultiSelectProps {
  name: string
  label: string
  isLoading?: boolean
  disabled?: boolean
  options: Option[]
  categories?: Category[]
  placeholder?: string
  tooltip?: string | null
  hint?: string | null
  initialQuery?: string
  defaultIcon?: string
  valueAs?: 'string' | 'number'
  validation?: Validation
  defaultValue?: string[] | string | number | null
  async?: boolean
  onChange?: (value: string) => void
}

const MultiSelect = ({
  name,
  isLoading,
  disabled,
  options,
  categories,
  placeholder = 'Select',
  initialQuery,
  defaultIcon,
  hint,
  tooltip,
  validation,
  defaultValue,
  label,
  async,
  onChange,
}: MultiSelectProps) => {
  const rules = validation?.rules
  const errorMessage = validation?.errorMessage
  const error = useFormError(name, errorMessage)
  const { field } = useController({ name, rules, defaultValue })
  const selectedOptions = options.filter((option) => Array.isArray(field.value) && field.value.includes(option.value))
  const { filteredOptions, setQuery, clear } = useSelect(name, initialQuery, options, categories, onChange, async)
  const value = !field.value || (Array.isArray(field.value) && !field.value[0]) ? '' : field.value

  const handleOnChange = useCallback(
    (value: string) => {
      const alreadyAdded = selectedOptions.find((o) => o.value === value)
      if (alreadyAdded) return
      if (value) {
        field.onChange([...field.value, value])
      } else {
        field.onChange(field.value.filter((v: string) => v !== value))
      }
    },
    [field, selectedOptions]
  )

  const handleRemove = useCallback(
    (value: string | null) => {
      field.onChange(field.value.filter((v: string) => v !== value))
    },
    [field]
  )

  return (
    <Field name={name} label={label} error={error} hint={hint} tooltip={tooltip}>
      <ComboBox
        ref={field.ref}
        disabled={disabled}
        isLoading={isLoading}
        options={filteredOptions}
        value={value}
        name={name}
        placeholder={placeholder}
        defaultIcon={defaultIcon}
        error={error}
        onChange={handleOnChange}
        setQuery={setQuery}
        clear={clear}
      />
      <div className="mt-1">
        {selectedOptions.map((option) => {
          return (
            <label key={option.value} htmlFor={name} className="my-1 block cursor-pointer">
              <Box className="bg-gray-9/10 hover:bg-gray-9/20 flex flex-row justify-between rounded-lg p-3">
                <button onClick={() => handleRemove(option.value)} className="flex w-full items-center justify-between">
                  {option.icon && <i className={classNames('mx-2 flex h-6 w-6', option.icon)} />}
                  <span className="text-gray-9 flex-grow text-left">{option.label}</span>
                  <i className="icon-clear text-gray-7 ml-3" />
                </button>
              </Box>
            </label>
          )
        })}
      </div>
    </Field>
  )
}

export default MultiSelect
