import React, { ReactNode } from 'react'

interface ModalBody {
  children: ReactNode
  className?: string
}

const ModalBody = ({ children, className = '' }: ModalBody) => {
  return <hot-modal-body class={className}>{children}</hot-modal-body>
}

export default ModalBody
