import React, { ReactNode } from 'react'

import './style.scss'

interface IPropTypes {
  className?: string
  id: string
  active?: boolean
  children?: ReactNode
  type?: 'red' | 'blue' | 'purple' | 'cyan' | 'green' | 'yellow' | ''
  size?: 'sm' | 'lg' | ''
  dismissible?: boolean
}

const Tag = ({ active = false, className = '', children, type = '', dismissible = false, size = '' }: IPropTypes) => {
  const isActive = active ? { active: '' } : {}

  const typeClass = type ? `hot-tag--${type}` : ''
  const sizeClass = size ? `hot-tag--${size}` : ''

  const classes = `${className} ${typeClass} ${sizeClass}`.trim()

  return (
    <hot-tag data-testid="tag-component" class={classes} {...dismissible} {...isActive}>
      {children}
    </hot-tag>
  )
}

export default Tag
