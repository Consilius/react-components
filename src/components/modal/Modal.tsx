import { Dialog } from '@headlessui/react'
import { PropsWithChildren } from 'react'

type ModalProps = PropsWithChildren & {
  isOpen: boolean
  title?: string
  description?: React.ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, title, description, onClose }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="absolute inset-0 z-50 overflow-y-auto overflow-x-hidden bg-black/30"
    >
      <div className="flex items-start justify-center">
        <Dialog.Panel className="my-7_5 mx-5 rounded-2_5 bg-white p-5 pt-7_5 shadow-md md:max-w-160 md:p-10">
          {title && <Dialog.Title className="mb-8 text-center text-3xl font-bold">{title}</Dialog.Title>}
          {description && (
            <Dialog.Description className="mb-10 text-center text-lg font-normal">{description}</Dialog.Description>
          )}
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default Modal
