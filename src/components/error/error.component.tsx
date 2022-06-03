import React, { ReactNode } from 'react'

interface IPropTypes {
  className?: string,
  children?: ReactNode
}

const Error = ({ className, children }: IPropTypes) => {
  return (
    <hot-alert class={`hot-alert--danger _mb-0 ${className}`}>
      {children}
    </hot-alert>
  )
}

export default Error
