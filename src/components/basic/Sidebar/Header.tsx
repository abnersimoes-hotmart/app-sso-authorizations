import React, { memo, ReactNode } from 'react'

interface SidebarHeader {
  children: ReactNode
  className?: string
}

const SidebarHeader = memo(({ children, className = '' }: SidebarHeader) => (
  <hot-sidebar-header class={className}>{children}</hot-sidebar-header>
))

SidebarHeader.displayName = 'SidebarHeader'

export default SidebarHeader
