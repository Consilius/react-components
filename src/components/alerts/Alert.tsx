import { matchEach } from '@/utils/matchEach'
import { cva, VariantProps } from 'class-variance-authority'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type AlertVariantProps = VariantProps<typeof alert>

const alert = cva('flex gap-5 w-full px-5 py-2_5 rounded-2_5', {
  variants: {
    type: {
      info: ['bg-blue-1', 'text-blue-5'],
      warning: ['bg-orange/10', 'text-orange'],
      error: ['bg-red/10', 'text-red'],
      success: ['bg-green-delloite/10', 'text-green-delloite'],
    },
  },
  defaultVariants: {
    type: 'warning',
  },
})

type AlertProps = PropsWithChildren & {
  variant?: AlertVariantProps
  className?: string
}

const variantDefaults: AlertVariantProps = { type: 'warning' }

const Alert: React.FC<AlertProps> = ({ children, variant, className }) => {
  const variants = { ...variantDefaults, ...variant }

  const icon = matchEach(variants.type as string, {
    info: 'info',
    error: 'warning',
    warning: 'warning',
    success: 'checkmark',
  })

  return (
    <div className={twMerge(alert(variants), className)}>
      {variant && <div className={twMerge(`icon-${icon}`, 'h-3 w-auto md:h-4')}></div>}
      <div>{children}</div>
    </div>
  )
}

export default Alert
