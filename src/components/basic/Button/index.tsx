import React, { ReactNode } from 'react'

interface IPropTypes {
  children?: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'submit' | 'button' | 'reset'
  variation?: string
  size?: 'sm' | 'lg' | null
  disabled?: boolean
  id?: any
  className?: string
}

const constructClassNames = (variation, size, className = '') => {
  const variationClass = variation ? `hot-button--${variation}` : ''
  const sizeClass = size ? `hot-button--${size}` : ''

  return `hot-button ${variationClass} ${sizeClass} ${className}`.trim()
}

const Button = ({
  children,
  onClick,
  size,
  type = 'button',
  variation,
  disabled = false,
  className = ''
}: IPropTypes) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={constructClassNames(variation, size, className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
