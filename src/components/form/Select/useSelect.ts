import { Category, Option } from '@/components/types'
import { debounce } from 'debounce'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'

export const useSelect = (
  name: string,
  initialQuery: string = '',
  options: Option[],
  categories?: Category[],
  onChange?: (value: string) => void,
  async: boolean = false
) => {
  const { setValue } = useFormContext()
  const [query, setQuery] = useState(initialQuery)

  const groupedOptions = useMemo(() => {
    return (
      categories?.reduce((acc, category) => {
        acc.push({ label: category.label, value: null })

        for (const item of category.items) {
          const option = options.find((option) => option.value === item)
          if (option) {
            acc.push(option)
          }
        }

        return acc
      }, [] as Option[]) || []
    )
  }, [options, categories])

  const filteredOptions = useMemo(() => {
    if (async) {
      return query === '' ? (categories && options.length ? groupedOptions : options) : options
    } else {
      return query === ''
        ? categories && options.length
          ? groupedOptions
          : options
        : options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
    }
  }, [query, options, categories, groupedOptions, async])

  const clear = useCallback(() => {
    setValue(name, [])
    setQuery(initialQuery)
  }, [initialQuery, setValue, name])

  useEffect(() => {
    onChange?.(query)
  }, [onChange, query])

  return useMemo(
    () => ({ groupedOptions, filteredOptions, clear, query, setQuery: async ? debounce(setQuery, 200) : setQuery }),
    [groupedOptions, filteredOptions, clear, query, setQuery, async]
  )
}
