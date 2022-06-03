import React, { ReactNode } from 'react'

interface INavItemProps {
  children: ReactNode
  onClick?: () => void
  active?: boolean
  className?: string
}

const NavItem = ({ children, active = false, className = '', onClick = () => null }: INavItemProps) => {
  const classes = `${className} ${active ? 'hot-nav__item--active' : 'hot-nav__item'}`

  return (
    <hot-nav-item class={classes} onClick={onClick}>
      {children}
    </hot-nav-item>
  )
}

export default NavItem
