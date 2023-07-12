import { useEffect } from 'react'
import { FieldErrors, useFormContext } from 'react-hook-form'

export function getErrorMessage(error: any, errorMessage?: string): string {
  if (error) {
    if (errorMessage) {
      return errorMessage
    }

    return error.message
  }

  return ''
}

export function useFormError(name: string, errorMessage?: string) {
  const { formState } = useFormContext()
  const error = formState.errors[name]

  return getErrorMessage(error, errorMessage)
}

export function useScrollToError(errors: FieldErrors) {
  useEffect(() => {
    if (errors) {
      const errorsValues = Object.keys(errors)

      if (errorsValues.length > 0) {
        const elements = document.getElementsByName(errorsValues[0])

        if (elements && elements[0]) {
          elements[0].scrollIntoView({ behavior: 'smooth' })
          elements[0].focus()
        } else {
          // try find element by id
          const element = document.getElementById(errorsValues[0])
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
            element.focus()
          }
        }
      }
    }
  }, [errors])
}
