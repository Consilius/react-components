import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps extends PropsWithChildren {
  className?: string
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return <div className={twMerge('rounded-2_5 bg-gray-2/10', className)}>{children}</div>
}

export default Box
