import ProgressBarProvider from '@/components/progress/ProgressBarProvider'
import type { AppProps } from 'next/app'

import '@/styles/app.scss'
import 'react-datepicker/dist/react-datepicker.css'

import { FlashMessagesProvider } from '@/providers/FlashMessagesProvider'
import { openSans } from '@/utils/fontUtils'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Niumad</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={openSans.className}>
        <QueryClientProvider client={queryClient}>
          <FlashMessagesProvider>
            <ProgressBarProvider>
              <Component {...pageProps} />
            </ProgressBarProvider>
          </FlashMessagesProvider>
        </QueryClientProvider>
      </main>
    </>
  )
}

export default App
