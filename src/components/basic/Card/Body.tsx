import React, { memo, ReactNode } from 'react'

interface CardBody {
  children: ReactNode
  className?: string
}

const CardBody = memo(({ children, className = '' }: CardBody) => (
  <hot-card-body class={className}>{children}</hot-card-body>
))

CardBody.displayName = 'CardBody'

export default CardBody
