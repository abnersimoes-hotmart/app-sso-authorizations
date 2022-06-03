import React, { ReactNode, useEffect, useRef } from 'react'

import Header from './Header'
import Body from './Body'

interface IPropTypes {
  children?: ReactNode
  className?: string
  isOpen?: boolean
  onClose: () => void
  position?: 'left' | 'right' | ''
}

const Sidebar = ({ isOpen = false, onClose, position = 'right', className = '', children }: IPropTypes) => {
  const positionClass = position ? `hot-sidebar--${position}` : ''

  const classes = `${className} ${positionClass}`.trim()

  const sidebarRef = useRef<any>(null)

  useEffect(() => {
    const { current } = sidebarRef

    current.addEventListener('close', onClose)
    return () => current.removeEventListener('close', onClose)
  }, [onClose])

  useEffect(() => {
    isOpen ? sidebarRef.current.openSidebar() : sidebarRef.current.closeSidebar()
  }, [isOpen])

  return (
    <hot-sidebar ref={sidebarRef} class={classes}>
      {children}
    </hot-sidebar>
  )
}

Sidebar.Header = Header
Sidebar.Body = Body

Sidebar.displayName = 'Sidebar'

export default Sidebar
