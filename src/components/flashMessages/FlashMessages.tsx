import { FlashMessagesContext } from '@/providers/FlashMessagesProvider'
import React, { Fragment, useContext, useMemo } from 'react'
import Alert from '../alerts/Alert'

type FlashMessagesProps = {
  group?: string
  filterBy?: FlashMessageType
  className?: string
}

type FlashMessageType = 'info' | 'error' | 'success' | 'warning' | 'custom'

const FlashMessages: React.FC<FlashMessagesProps> = ({ group = 'default', filterBy, className }) => {
  const flashMessagesContext = useContext(FlashMessagesContext)

  const flashMessages = useMemo(() => {
    const messages = flashMessagesContext.getMessagesFromGroup(group)

    if (filterBy) {
      return messages.filter((message) => message.type === filterBy)
    }

    return messages
  }, [flashMessagesContext, group, filterBy])

  return (
    <div className={className}>
      {flashMessages.map((flashMessage) => {
        if (flashMessage.type === 'custom') {
          return <Fragment key={flashMessage.id}>{flashMessage.message}</Fragment>
        }

        return (
          <Alert key={flashMessage.id} variant={{ type: flashMessage.type }} className="my-4">
            {flashMessage.message}
          </Alert>
        )
      })}
    </div>
  )
}

export default FlashMessages
