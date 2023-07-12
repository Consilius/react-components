import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { AnchorProps, ButtonVariantProps, button } from './Button'

const variantDefaults: ButtonVariantProps = { intent: 'secondary', size: 'large' }

const Link = forwardRef<HTMLAnchorElement, AnchorProps>(({ variant, children, className, icon, ...restProps }, ref) => {
  return (
    <a ref={ref} className={twMerge(button({ ...variantDefaults, ...variant }), className)} {...restProps}>
      {children && <div className="buttonContent">{children}</div>}
      {icon && <div className={twMerge(`icon-${icon}`, 'h-3 w-auto md:h-4')}></div>}
    </a>
  )
})

Link.displayName = 'Link'

export default Link
