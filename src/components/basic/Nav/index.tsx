import React, { ReactNode } from 'react'

import NavDropdown from './NavDropdown'
import NavDropdownMenuItem from './NavDropdownMenuItem'
import NavItem from './NavItem'

interface INavProps {
  children: ReactNode
  type?: 'tabs' | 'pills'
  className?: string
}

const Nav = ({ children, type = 'tabs', className = '' }: INavProps) => {
  const typeClass = `hot-nav--${type}`
  const classes = `${className} ${typeClass}`

  return <hot-nav class={classes}>{children}</hot-nav>
}

Nav.Item = NavItem
Nav.Dropdown = NavDropdown
Nav.DropdownMenuItem = NavDropdownMenuItem

Nav.displayName = 'Nav'

export default Nav
