import { Transition } from '@headlessui/react'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'
import Tooltip from '../Tooltip'
import FadeIn from '../animation/FadeIn'

interface FieldProps extends PropsWithChildren {
  name: string
  className?: string
  label?: string
  error?: string
  hint?: string | null
  tooltip?: string | null
}

const Field = ({ name, label, hint, error, children, className, tooltip }: FieldProps) => {
  return (
    <FadeIn className="w-full">
      <label htmlFor={name} className={twMerge(className, 'flex flex-col')}>
        {label && <Label label={label} tooltip={tooltip} />}

        <ErrorMessage error={error} />

        {children}

        {hint && <span className="py-2 text-xxs text-gray-9">{hint}</span>}
      </label>
    </FadeIn>
  )
}

export function ErrorMessage({ error }: { error?: string }) {
  return (
    <Transition
      show={!!error}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <span className="py-1 text-xxs text-red">{error}</span>
    </Transition>
  )
}

interface LabelProps {
  label: string
  tooltip?: React.ReactNode
  animationDelay?: number
}

function Label({ label, tooltip }: LabelProps) {
  return (
    <div className="flex justify-between pb-5">
      <h5 className="w-full flex-1 break-words text-black" dangerouslySetInnerHTML={{ __html: label }} />
      {tooltip && <Tooltip text={tooltip} />}
    </div>
  )
}

export default Field
