import ArrowButton from '@/components/buttons/ArrowButton'
import useMeridiemTime from '@/hooks/useMeridiemTime'
import Switch from '../Switch'

interface TimePickerProps extends Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> {
  value: string
  onChange: (value: string) => void
  open: boolean
}

const meridiemOptions = [
  { label: 'AM', value: 'AM' },
  { label: 'PM', value: 'PM' },
]

const BaseTimePicker = ({ value, onChange, open }: TimePickerProps) => {
  const {
    decrementHours,
    decrementMinutes,
    handleMeridiemChange,
    incrementHours,
    incrementMinutes,
    meridiem,
    meridiemHours,
    meridiemMinutes,
  } = useMeridiemTime(value, onChange)

  if (!open) return null

  return (
    <div className="flex items-center">
      <div className="flex flex-1 items-center">
        <div className="flex flex-col items-center p-5">
          <ArrowButton direction="up" onClick={incrementHours} />
          <div className="text-gray-9 my-2">{meridiemHours}</div>
          <ArrowButton direction="down" onClick={decrementHours} />
        </div>

        <div>:</div>

        <div className="flex flex-col items-center p-5">
          <ArrowButton direction="up" onClick={incrementMinutes} />
          <div className="text-gray-9 my-2">{meridiemMinutes}</div>
          <ArrowButton direction="down" onClick={decrementMinutes} />
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <Switch value={meridiem} options={meridiemOptions} onClick={handleMeridiemChange} />
      </div>
    </div>
  )
}

export default BaseTimePicker
