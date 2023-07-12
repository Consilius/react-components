import classNames from 'classnames'
import { Step } from './useSetupSteps'

type ProgressBarLabelProps = Step & {
  isActive?: boolean
}

const ProgressBarLabel: React.FC<ProgressBarLabelProps> = ({
  label = '',
  isActive = false,
  isSuccess = false,
  progress = 0,
}) => {
  const labelStyles = classNames('text-xxs font-semibold', {
    'text-gray-6': !isActive && progress === 0,
    'text-black': isActive || progress >= 0,
    'text-green-delloite': isSuccess,
  })

  return (
    <div className="min-w-28">
      <div className={labelStyles}>{label}</div>
    </div>
  )
}
export default ProgressBarLabel
