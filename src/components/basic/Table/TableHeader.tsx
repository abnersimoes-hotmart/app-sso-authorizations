import React, { ReactNode } from 'react'

interface TableHeader {
  children: ReactNode
  className?: string
}

const TableHeader = ({ children, className = '' }: TableHeader) => {
  return <thead className={className}>{children}</thead>
}

export default TableHeader
