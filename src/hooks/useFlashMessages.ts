import { FlashMessagesContext } from '@/providers/FlashMessagesProvider'
import { useContext } from 'react'

export const useFlashMessages = () => {
  return useContext(FlashMessagesContext)
}
