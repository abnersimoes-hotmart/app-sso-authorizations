import React, { ReactNode } from 'react'

interface TableBody {
  children: ReactNode
  className?: string
}

const TableBody = ({ children, className = '' }: TableBody) => {
  return <tbody className={className}>{children}</tbody>
}

export default TableBody
