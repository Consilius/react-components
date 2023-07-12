import { Option } from '@/components/types'
import { Combobox, Transition } from '@headlessui/react'
import classNames from 'classnames'
import { ForwardedRef, forwardRef } from 'react'

interface ComboBoxProps {
  isLoading?: boolean
  disabled?: boolean
  options: Option[]
  value: string | null
  name: string
  placeholder?: string
  error?: string
  defaultIcon?: string
  onChange: (value: string) => void
  setQuery: (query: string) => void
  clear: () => void
}

const ANIMATION_DURATION = 150

function GroupLabel({ label }: { label: string }) {
  return (
    <div className="text-gray-7 flex items-center text-sm">
      <span>{label}</span>
      <span className="flex-grow" />
    </div>
  )
}

const ComboBox = forwardRef(
  (
    {
      isLoading,
      disabled,
      options,
      value,
      name,
      placeholder,
      error,
      onChange,
      setQuery,
      clear,
      defaultIcon,
    }: ComboBoxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const selectedOption = options.find((o) => o.value === value)

    function onClick() {
      if (!value) return true
      setTimeout(() => {
        clear()
      }, ANIMATION_DURATION)
    }

    function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
      if (e.key === 'Enter' || e.key === 'Space') {
        setTimeout(() => {
          clear()
        }, ANIMATION_DURATION)
      }

      return true
    }

    return (
      <Combobox value={value} onChange={onChange} disabled={disabled}>
        {({ open }) => (
          <>
            <Combobox.Button as="div" className="relative flex w-full">
              <div className="absolute flex h-full w-10 items-center justify-center">
                {selectedOption?.icon ? (
                  <i className={classNames('h-6 w-6', selectedOption.icon)} />
                ) : (
                  defaultIcon && (
                    <i
                      className={classNames(
                        'absolute flex h-full w-12 items-center justify-center text-2xl',
                        defaultIcon
                      )}
                    />
                  )
                )}
              </div>
              <Combobox.Input
                name={name}
                ref={ref}
                onChange={(event) => setQuery(event.target.value)}
                className={classNames(
                  ' text-gray-9 w-full rounded-lg border p-3',
                  !disabled && 'hover:border-gray-9/20 focus:border-gray-9/20',
                  open ? 'rounded-b-none' : 'rounded-b-lg',
                  error ? 'border-red focus:border-red' : 'border-gray-9/10',
                  selectedOption?.icon || defaultIcon ? 'px-9' : 'pr-9'
                )}
                placeholder={placeholder}
                displayValue={(value: string) => {
                  return options.find((o) => o.value === value)?.label || ''
                }}
              />

              <Transition
                show={!disabled && !isLoading}
                enter={`transition-opacity duration-${ANIMATION_DURATION}`}
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave={`transition-opacity duration-${ANIMATION_DURATION}`}
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Combobox.Button
                  className="absolute right-0 h-full w-10 hover:cursor-pointer"
                  // @ts-ignore
                  tabindex={0} // it needs to overide the default -1 so that the Combobox.Button can open the dropdown, yes it's lower case i, no don't change it
                  onClick={onClick}
                  onKeyDown={onKeyDown}
                >
                  <Transition
                    show={!open}
                    enter={`transition-opacity duration-${ANIMATION_DURATION}`}
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave={`transition-opacity duration-${ANIMATION_DURATION}`}
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="text-gray-7 absolute right-3 top-3.5">
                      {value ? <i className="icon-clear" /> : <i className="icon-chevron-down" />}
                    </div>
                  </Transition>
                </Combobox.Button>
              </Transition>
              <Transition
                show={isLoading}
                enter={`transition-opacity duration-${ANIMATION_DURATION}`}
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave={`transition-opacity duration-${ANIMATION_DURATION}`}
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute right-0 flex h-full w-10 items-center justify-center">
                  <div className="border-gray-9/20 h-5 w-5 animate-spin rounded-full border-2 border-solid border-t-transparent" />
                </div>
              </Transition>
            </Combobox.Button>

            <div className="relative">
              <Combobox.Options
                static
                className={classNames(
                  'transition-height border-gray-9/20 absolute z-10 w-full overflow-auto border',
                  open ? 'max-h-60 rounded-t-none' : 'max-h-0 border-transparent'
                )}
                style={{ transitionDuration: `${ANIMATION_DURATION * 2}ms` }}
              >
                {options.map((option, i) => (
                  <Combobox.Option
                    disabled={option.value === null}
                    key={`${name}-${option.label}-${i}`}
                    value={option.value}
                    className={classNames(
                      'flex px-3 ui-active:bg-gray-100 ui-not-active:bg-white',
                      option.value ? 'border-gray-9/10 border-b p-3' : 'pt-3 pb-0'
                    )}
                  >
                    {option.value === null ? (
                      <GroupLabel label={option.label} />
                    ) : (
                      <>
                        {option.icon ? (
                          <>
                            <i className={classNames('mx-2 h-6 w-6', option.icon)} />
                            <span dangerouslySetInnerHTML={{ __html: option.label }} />
                          </>
                        ) : (
                          <>
                            {option.subtext ? (
                              <div className="flex flex-col">
                                <span className="text-sm">{option.label}</span>
                                <span className="text-xs">{option.subtext}</span>
                              </div>
                            ) : (
                              <span dangerouslySetInnerHTML={{ __html: option.label }} />
                            )}
                          </>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </>
        )}
      </Combobox>
    )
  }
)

ComboBox.displayName = 'ComboBox'

export default ComboBox
