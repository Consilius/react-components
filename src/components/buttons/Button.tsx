import { cva, VariantProps } from 'class-variance-authority'
import { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonVariantProps = VariantProps<typeof button>

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: ButtonVariantProps
  icon?: string
}

export type AnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
  variant?: ButtonVariantProps
  icon?: string
}

export const button = cva(
  'flex gap-2 rounded-2_5 py-3 px-5 font-semibold disabled:opacity-40 disabled:pointer-events-none max-w-110 focus:outline-0',
  {
    variants: {
      intent: {
        primary: ['bg-green-delloite', 'text-white', 'hover:bg-green-4', 'justify-between', 'items-center'],
        'primary-red': ['bg-red', 'text-white', 'hover:bg-red/40', 'justify-between', 'items-center'],
        secondary: [
          'bg-gray-9/10',
          'text-gray-9',
          'hover:bg-gray-9/20',
          'hover:text-black',
          'justify-center',
          'md:justify-between',
          'md:items-center',
          '[&>.buttonContent]:hidden',
          '[&>.buttonContent]:md:block',
        ],
        icon: ['justify-center', 'items-baseline'],
        custom: [''],
      },
      fontSize: {
        'extra-small': ['text-xxs'],
        small: ['text-xs'],
        normal: ['text-sm'],
        custom: [''],
      },
      size: {
        large: ['h-12', 'w-full', 'md:w-50'],
        normal: ['h-10', 'w-10', 'md:w-50', 'md:h-10'],
        small: ['h-10', 'w-10', 'md:h-12', 'md:w-12'],
        'small-nr': ['h-10', 'w-10'],
        'large-full': ['h-12', 'w-full'],
        custom: [''],
      },
      loading: {
        true: ['opacity-50', 'pointer-events-none'],
      },
      iconType: {
        info: ['bg-gray-9/10', 'text-gray-9', 'hover:bg-gray-9/20', 'hover:text-black'],
        error: ['bg-red/10', 'text-red', 'hover:bg-red/20'],
        attention: ['bg-yellow/10', 'text-yellow', 'hover:bg-yellow/20'],
        warning: ['bg-orange/10', 'text-orange', 'hover:bg-orange/20'],
        success: ['bg-green-delloite/60', 'text-white', 'hover:bg-green-delloite/70'],
      },
      orientation: {
        normal: ['flex-row'],
        reverse: ['flex-row-reverse'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      orientation: 'normal',
      size: 'large',
      fontSize: 'normal',
    },
  }
)

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, icon, children, type = 'button', ...rest }, ref) => {
    return (
      <button ref={ref} className={twMerge(button(variant), className)} type={type} {...rest}>
        {children && (
          <div
            className={twMerge(
              'buttonContent',
              'flex-1',
              variant?.orientation === 'reverse' ? 'text-right' : 'text-left'
            )}
          >
            {children}
          </div>
        )}
        {icon && <div className={twMerge(`icon-${icon}`, 'h-3 w-auto md:h-4')}></div>}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
