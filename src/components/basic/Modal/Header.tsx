import React, { ReactNode } from 'react'

interface ModalHeader {
  className?: string
  children: ReactNode
}

const ModalHeader = ({ children, className = '' }: ModalHeader) => {
  return <hot-modal-header class={className}>{children}</hot-modal-header>
}

export default ModalHeader
