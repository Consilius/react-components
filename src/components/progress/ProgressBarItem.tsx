import classNames from 'classnames'
import { Step } from './useSetupSteps'

type ProgressBarItemProps = Step & {
  isActive?: boolean
}

const ProgressBarItem: React.FC<ProgressBarItemProps> = ({
  label = '',
  isActive = false,
  isSuccess = false,
  progress = 0,
}) => {
  const barStyles = classNames('h-1 md:rounded-2_5 border-r-1 md:border-r-0 border-r-gray-2', {
    'w-full': isActive,
    'bg-green-delloite': isSuccess,
    'bg-black': !isSuccess,
  })

  const width = isActive || isSuccess ? 100 : progress

  return (
    <div className="rounded-2_5 bg-gray-9/20 md:min-w-28 h-1 flex-1 md:flex-grow-0" key={`bar-${label}`}>
      <div className={barStyles} style={{ width: `${width}%` }}></div>
    </div>
  )
}
export default ProgressBarItem
