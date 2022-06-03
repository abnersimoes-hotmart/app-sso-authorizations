import React, { ReactNode } from 'react'

interface TableTr {
  children: ReactNode
}

const TableTr = ({ children }: TableTr) => {
  return <tr>{children}</tr>
}

export default TableTr
