import React, { ReactNode } from 'react'

interface INavDropdownProps {
  children: ReactNode
  className?: string
}

const NavItem = ({ children, className = '' }: INavDropdownProps) => {
  return <hot-dropdown class={className}>{children}</hot-dropdown>
}

export default NavItem
