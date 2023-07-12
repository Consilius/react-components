import Button from '@/components/buttons/Button'
import { format, getMonth, getYear, isPast, isToday, isValid } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import ReactDatePicker, { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import Combobox from '../Select/ComboBox'

type DatePickerHeaderProps = ReactDatePickerCustomHeaderProps & {
  isPreSelectedMonth?: boolean
  preSelectedMonth?: number
}

const DatePickerHeader: React.FC<DatePickerHeaderProps> = ({
  date,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  isPreSelectedMonth,
  preSelectedMonth,
}) => {
  const [query, setQuery] = useState('')
  const selectedMonth = isPreSelectedMonth ? (preSelectedMonth as number) : getMonth(date)
  const selectedYear = getYear(date)

  // Months names
  const months = new Array(12).fill(0).map((_, index) => {
    const num = (index + 1).toString().padStart(2, '0')
    return num
  })

  const monthsOptions = useMemo(() => {
    return months.map((month, index) => ({
      label: `${month} ${selectedYear}`,
      value: index.toString(),
    }))
  }, [months, selectedYear])

  const filteredMonthsOptions = useMemo(() => {
    if (query === '') {
      return monthsOptions
    }

    return monthsOptions.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()))
  }, [monthsOptions, query])

  const handleComboboxChange = (value: string) => {
    changeMonth(parseInt(value, 10))
  }

  const clearComboboxQuery = () => {
    setQuery('')
  }

  return (
    <div className="flex items-center justify-between justify-items-center gap-5">
      <Button variant={{ size: 'small-nr' }} onClick={decreaseMonth} disabled={prevMonthButtonDisabled} />

      <div className="flex-1">
        <Combobox
          isLoading={false}
          setQuery={setQuery}
          options={filteredMonthsOptions}
          value={selectedMonth.toString()}
          name="datepickerheader-select"
          onChange={handleComboboxChange}
          clear={clearComboboxQuery}
        ></Combobox>
      </div>

      <Button variant={{ size: 'small-nr' }} onClick={increaseMonth} disabled={nextMonthButtonDisabled} />
    </div>
  )
}

// DatePicker
interface DatePickerProps {
  name: string
  label?: string
  placeholder?: string
  errorMessage?: string
  disabled?: boolean
  className?: string
  excludeDates?: Date[]
  highlightDates?: Array<Date | { [key: string]: Date[] }>
  skipFilterDays?: boolean
  value: string
  onChange: (value: string) => void
  selectedFirstDate?: string
}

const dateFormat = 'yyyy-MM-dd'

export const BaseDatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, onChange } = props
  const router = useRouter()
  const [datePickerValue, setDatePickerValue] = useState<string | null | undefined>(
    isValid(new Date(value)) ? value : null
  )

  const preSelectedMonth =
    props.selectedFirstDate && !datePickerValue ? new Date(props.selectedFirstDate).getMonth() : undefined
  const isPreSelectedMonth = !!(preSelectedMonth && !value)

  // handlers
  const handleDatePickerChange = (newDate: Date) => {
    onChange(format(newDate, dateFormat))
    setDatePickerValue(format(newDate, dateFormat))
  }

  const filterDate = (date: Date) => {
    if (props.skipFilterDays) {
      return true
    }

    if (isToday(date)) {
      return true
    }

    return !isPast(date)
  }

  // prevents invalid user input
  useEffect(() => {
    if (value && isValid(new Date(value)) && value !== datePickerValue) {
      setDatePickerValue(value)
    }
  }, [value, datePickerValue])

  return (
    <ReactDatePicker
      locale={router.locale}
      selected={datePickerValue ? new Date(datePickerValue) : null}
      onChange={handleDatePickerChange}
      calendarClassName="nium-datepicker"
      calendarStartDay={1}
      filterDate={filterDate}
      excludeDates={props.excludeDates}
      highlightDates={props.highlightDates}
      renderCustomHeader={(headerProps) => (
        <DatePickerHeader
          isPreSelectedMonth={isPreSelectedMonth}
          preSelectedMonth={preSelectedMonth}
          {...headerProps}
        />
      )}
      inline
    />
  )
}

export default BaseDatePicker
