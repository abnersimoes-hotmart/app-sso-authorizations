import React, { ReactNode } from 'react'

interface Tooltip {
  children: ReactNode
  content: string | number | ReactNode
  className?: string
  position?: 'left' | 'right' | 'top' | 'bottom'
}

const Tooltip = ({ children, content, className = '', position = 'top' }: Tooltip) => {
  return (
    <hot-tooltip content={content} class={className} position={position}>
      {children}
    </hot-tooltip>
  )
}

export default Tooltip
