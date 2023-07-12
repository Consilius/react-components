import { useContext } from 'react'
import ProgressBarItem from './ProgressBarItem'
import ProgressBarLabel from './ProgressBarLabel'
import { ProgressBarContext } from './ProgressBarProvider'

const ProgressBar: React.FC = () => {
  const { steps, currentStep } = useContext(ProgressBarContext)

  if (!steps || !steps.length) {
    return null
  }

  const mobileCurrentStep = steps[currentStep]

  return (
    <div className="bg-gray-2/10">
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="flex justify-center gap-2.5 p-5">
          {steps.map((step, index) => {
            const isActive = currentStep === index
            const isSuccess = currentStep > index

            return (
              <div key={`ProgressBarCol-${index}`} className="flex flex-col gap-2.5">
                <ProgressBarLabel
                  key={`ProgressBarLabel-${index}`}
                  {...step}
                  isActive={isActive}
                  isSuccess={isSuccess}
                />
                <ProgressBarItem key={`ProgressBarItem-${index}`} {...step} isActive={isActive} isSuccess={isSuccess} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="block md:hidden">
        <div className="flex">
          {steps.map((step, index) => {
            const isActive = currentStep === index

            return <ProgressBarItem key={`ProgressBarItem-${index}`} {...step} isActive={isActive} />
          })}
        </div>
        <div className="flex justify-between py-2.5 px-5">
          <ProgressBarLabel {...mobileCurrentStep} isActive={true} />
          <div className="text-xxs">
            {currentStep + 1} / {steps.length}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
