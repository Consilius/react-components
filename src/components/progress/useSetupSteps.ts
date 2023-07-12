import { useState } from 'react'

const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
}

export type Step = {
  id: string
  label: string
  progress?: number
  isSuccess?: boolean
  route: string
  order: number
}

const steps: Step[] = [
  { label: 'Home', route: ROUTES.HOME, id: 'home', order: 1 },
  {
    label: 'Login',
    route: ROUTES.LOGIN,
    id: 'login',
    order: 2,
  },
  {
    label: 'Logout',
    route: ROUTES.LOGOUT,
    id: 'logout',
    order: 3,
  },
]

export const useSetupSteps = () => {
  // make submit disabled
  const [isNextBlocked, setIsNextBlocked] = useState(false)
  const enableNext = () => setIsNextBlocked(false)
  const disableNext = () => setIsNextBlocked(true)

  const maxSteps = steps.length - 1 // index based

  return {
    steps,
    isNextBlocked,
    enableNext,
    disableNext,
    maxSteps,
  }
}
