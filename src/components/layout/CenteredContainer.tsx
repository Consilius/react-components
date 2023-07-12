import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type CenteredMaxwContainerProps = PropsWithChildren & {
  className?: string
}

const CenteredMaxwContainer: React.FC<CenteredMaxwContainerProps> = ({ children, className }) => {
  return <div className={twMerge('mx-auto sm:max-w-135 md:max-w-180 desktop:max-w-190', className)}>{children}</div>
}

export default CenteredMaxwContainer
