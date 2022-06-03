import React, { ReactNode } from 'react'

interface ModalFooter {
  children: ReactNode
}

const ModalFooter = ({ children }: ModalFooter) => {
  return <hot-modal-footer>{children}</hot-modal-footer>
}

export default ModalFooter
