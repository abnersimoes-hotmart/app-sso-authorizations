import React, { useEffect, useRef, ReactNode } from 'react'

import ModalHeader from './Header'
import ModalBody from './Body'
import ModalFooter from './Footer'

interface IPropTypes {
  children: ReactNode
  onClose: () => void
  isOpen?: boolean
  className?: string
  position?: 'centered' | ''
}

const Modal = ({ children, onClose, isOpen = false, className = '', position = '' }: IPropTypes) => {
  const modalRef = useRef<any>(null)

  useEffect(() => {
    const { current } = modalRef

    current.addEventListener('close', onClose)
    return () => current.removeEventListener('close', onClose)
  }, [onClose])

  useEffect(() => {
    isOpen ? modalRef.current.openModal() : modalRef.current.closeModal()
  }, [isOpen])

  return (
    <hot-modal ref={modalRef} position={position} class={className}>
      {children}
    </hot-modal>
  )
}

Modal.Header = ModalHeader
Modal.Body = ModalBody
Modal.Footer = ModalFooter

export default Modal
