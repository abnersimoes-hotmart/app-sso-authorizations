import React, { ReactNode } from 'react'

interface INavDropdownMenuItemProps {
  children: ReactNode
  className?: string
}

const NavDropdownMenuItem = ({ children, className = '' }: INavDropdownMenuItemProps) => {
  return <hot-dropdown-menu-item class={className}>{children}</hot-dropdown-menu-item>
}

export default NavDropdownMenuItem
