import React, { memo, ReactNode } from 'react'

interface CardFooter {
  children: ReactNode
  className?: string
}

const CardFooter = memo(({ children, className = '' }: CardFooter) => (
  <hot-card-footer class={className}>{children}</hot-card-footer>
))

CardFooter.displayName = 'CardFooter'

export default CardFooter
