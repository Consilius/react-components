import { useEffect } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import FadeIn from '../animation/FadeIn'
import { Option, Validation } from '../types'
import OptionGroup from './OptionGroup'
import RadioGroup from './RadioGroup'
import { useFormError } from './utils'

interface ChoiceProps {
  name: string
  parentName?: string
  label: string
  isMulti?: boolean
  questionId: number
  disabled?: boolean
  defaultValue: string[] | null
  validation: Validation
  options: Option[]
  exclusiveAnswer: string
  tooltip?: string | null
  hint?: string | null
}

const Choice = ({
  name,
  label,
  questionId,
  isMulti,
  disabled,
  validation,
  defaultValue,
  options,
  exclusiveAnswer,
  tooltip,
  hint,
}: ChoiceProps) => {
  const rules = validation?.rules
  const errorMessage = validation?.errorMessage
  const error = useFormError(name, errorMessage)
  const { setValue } = useFormContext()
  // this is necessary because there might be a defaultValue / options mismatch in the data
  // resulting in the defaultValue not being in the options
  const isDefaultValueValid = !!options.find((option) => defaultValue?.includes(String(option.value)))
  const { field } = useController({
    name,
    rules,
    defaultValue: isDefaultValueValid ? defaultValue : [],
  })

  // This is necessary due to the cascading loading of the options and dependency on the parent value
  // ignore the react-hooks/exhaustive-deps warning
  useEffect(() => {
    if (isDefaultValueValid) {
      setValue(name, defaultValue)
    } else {
      setValue(name, [])
    }
  }, [isDefaultValueValid])

  const handleMultiChange = (value: string[]) => {
    if (exclusiveAnswer && value.includes(exclusiveAnswer)) {
      field.onChange([exclusiveAnswer])
    } else {
      field.onChange(value)
    }
  }

  return (
    <>
      {isMulti ? (
        <>
          <FadeIn key={String(questionId)}>
            <OptionGroup
              ref={field.ref}
              name={name}
              label={label}
              disabled={disabled}
              onChange={handleMultiChange}
              value={field.value}
              options={options}
              className="py-2"
              error={error}
              tooltip={tooltip}
              hint={hint}
            />
          </FadeIn>
        </>
      ) : (
        <>
          <FadeIn key={String(questionId)}>
            <RadioGroup
              ref={field.ref}
              type="choice"
              onChange={field.onChange}
              disabled={disabled}
              error={error}
              name={name}
              label={label}
              tooltip={tooltip}
              hint={hint}
              options={options}
              className="py-2"
            />
          </FadeIn>
        </>
      )}
    </>
  )
}

export default Choice
