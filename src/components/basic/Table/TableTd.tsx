import React, { ReactNode } from 'react'

interface TableTd {
  children: ReactNode
  className?: string
}

const TableTd = ({ children, className = '' }: TableTd) => {
  return <td className={className}>{children}</td>
}

export default TableTd
