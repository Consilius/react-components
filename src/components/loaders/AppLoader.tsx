import Image from 'next/legacy/image'
import { LoadingSpinner } from './LoadingSpinner'

type AppLoaderProps = {
  isLoading: boolean
  hasError: boolean
}

export const AppLoader: React.FC<AppLoaderProps> = ({ isLoading, hasError }) => {
  return (
    <div className="flex h-screen w-screen flex-col place-content-center place-items-center">
      <div className="w-36">
        <Image src={'/next-static/img/deloitte-logo.svg'} alt="Deloitte logo" width={132} height={25} />
      </div>
      {isLoading && <LoadingSpinner className="mt-2" color="black" />}
      {hasError && <div className="py-4 text-xl font-semibold">Something went wrong</div>}
    </div>
  )
}
