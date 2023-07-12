import { useRouter } from 'next/router'
import { PropsWithChildren, createContext, useCallback, useMemo } from 'react'
import { Step, useSetupSteps } from './useSetupSteps'

interface ProgressBarContextInterface {
  currentStep: number
  steps: Step[]
  maxSteps: number
  onNextStep: (newTripId?: number) => void
  onPrevStep: () => void
  isNextBlocked: boolean
  enableNext: () => void
  disableNext: () => void
}

interface RouteParam {
  pathname: string
  query?: Record<string, string | number>
}

export const ProgressBarContext = createContext<ProgressBarContextInterface>({
  currentStep: 0,
  steps: [] as Step[],
  maxSteps: 0,
  onNextStep: (newTripId?: number) => {},
  onPrevStep: (getPreviousRoute?: boolean) => {},
  isNextBlocked: false, // to prevent submit/next to be enabled
  enableNext: () => {},
  disableNext: () => {},
})

const ProgressBarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { steps, maxSteps, isNextBlocked, enableNext, disableNext } = useSetupSteps()
  const { route, push } = useRouter()

  const currentStepIndex = steps.findIndex((step) => route.includes(step.route))
  const currentStep = steps[currentStepIndex]

  const onPrevStep = useCallback(() => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex < 0) return

    const prevStep = steps[prevIndex]
    const prevRoute = prevStep.route

    const route = {
      pathname: prevRoute,
    }

    push(route)
  }, [push, currentStepIndex, currentStep, steps])

  const onNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex > steps.length - 1) return

    const nextStep = steps[nextIndex]
    const nextRoute = nextStep.route

    const route = {
      pathname: nextRoute,
    }

    push(route)
  }, [push, currentStepIndex, currentStep, steps])

  const value = useMemo(
    () => ({
      currentStep: currentStepIndex,
      steps,
      maxSteps,
      isNextBlocked,
      enableNext,
      disableNext,
      onNextStep,
      onPrevStep,
    }),
    [maxSteps, onNextStep, onPrevStep, currentStepIndex, isNextBlocked, steps, enableNext, disableNext]
  )

  return <ProgressBarContext.Provider value={value}>{children}</ProgressBarContext.Provider>
}

export default ProgressBarProvider
