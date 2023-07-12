import classNames from 'classnames'

interface Option {
  value: string
  label: string
}

interface MeridiemButtonProps {
  value: string
  options: Option[]
  onClick: (value: any) => void
}

function Switch({ options, value, onClick }: MeridiemButtonProps) {
  return (
    <>
      {options.map((option, i) => (
        <button
          key={option.value}
          type="button"
          className={classNames('h-10 w-14', value === option.value ? 'bg-black text-white' : 'bg-gray-9/10', {
            'rounded-l-lg': i === 0,
            'rounded-r-lg': i === options.length - 1,
          })}
          onClick={(e) => onClick(option.value)}
        >
          {option.label}
        </button>
      ))}
    </>
  )
}

export default Switch
