import React, { ReactNode } from 'react'

interface TableTh {
  children: ReactNode
  className?: string
}

const TableTh = ({ children, className = '' }: TableTh) => {
  return <th className={className}>{children}</th>
}

export default TableTh
