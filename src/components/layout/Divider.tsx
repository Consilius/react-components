import { twMerge } from 'tailwind-merge'

type DividerProps = {
  className?: string
}

const Divider: React.FC<DividerProps> = ({ className }) => (
  <div className={twMerge('h-[1px] w-full bg-black/10', className)}></div>
)

export default Divider
