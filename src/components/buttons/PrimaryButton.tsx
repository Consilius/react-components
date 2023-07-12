import { forwardRef } from 'react'
import Button, { ButtonProps, ButtonVariantProps } from './Button'

const variantDefaults: ButtonVariantProps = { intent: 'primary' }

const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(({ variant, children, ...restProps }, ref) => {
  return (
    <Button variant={{ ...variantDefaults, ...variant }} {...restProps} ref={ref}>
      {!children && <div>Primary</div>}
      {children}
    </Button>
  )
})

PrimaryButton.displayName = 'PrimaryButton'

export default PrimaryButton
