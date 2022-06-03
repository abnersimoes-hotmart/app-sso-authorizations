import React, { memo, ReactNode } from 'react'

interface SidebarBody {
  children: ReactNode
  className?: string
}

const SidebarBody = memo(({ children, className = '' }: SidebarBody) => (
  <hot-sidebar-body class={className}>{children}</hot-sidebar-body>
))

SidebarBody.displayName = 'SidebarBody'

export default SidebarBody
