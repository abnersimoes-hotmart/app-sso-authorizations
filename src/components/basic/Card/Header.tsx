import React, { memo, ReactNode } from 'react'

interface CardHeader {
  children: ReactNode
  className?: string
}

const CardHeader = memo(({ children, className = '' }: CardHeader) => (
  <hot-card-header class={className}>{children}</hot-card-header>
))

CardHeader.displayName = 'CardHeader'

export default CardHeader
