import React, { useRef, useEffect } from 'react'

interface IPropTypes {
  children: React.ReactNode
  variation?: 'danger' | 'info' | 'success' | 'warning'
  className?: string
  onDismiss?: () => void
  dismissible?: boolean
}

const constructClassName = (variation, dismissible, className) => {
  const mainClassName = variation ? `hot-alert--${variation}` : ''

  return `${mainClassName}${dismissible ? ' fade show' : ''} ${className}`.trim()
}

const Alert = ({
  children,
  onDismiss = () => null,
  variation = 'info',
  className = '',
  dismissible = false
}: IPropTypes) => {
  const alertRef = useRef<any>(null)

  useEffect(() => {
    const { current } = alertRef

    current.addEventListener('dismiss', onDismiss)
    return () => {
      current.removeEventListener('dismiss', onDismiss)
    }
  }, [onDismiss])

  return (
    <hot-alert
      ref={alertRef}
      role="alert"
      class={constructClassName(variation, dismissible, className)}
      {...(dismissible ? { dismissible } : {})}
    >
      {children}
    </hot-alert>
  )
}

export default Alert
