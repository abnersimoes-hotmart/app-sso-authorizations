import React, { ReactNode } from 'react'

import Header from './Header'
import Body from './Body'
import Footer from './Footer'

interface IPropTypes {
  children: ReactNode
  className?: string
  slot?: string
}

const Card = ({ children, className = '', slot = '' }: IPropTypes) => {
  const optionalProps = {
    ...(slot ? { slot } : {})
  }

  return (
    <hot-card class={className} {...optionalProps}>
      {children}
    </hot-card>
  )
}

Card.Body = Body
Card.Header = Header
Card.Footer = Footer

Card.displayName = 'Card'

export default Card
