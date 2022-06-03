import React, { ReactNode } from 'react'

import TableHeader from './TableHeader'
import TableBody from './TableBody'
import TableTr from './TableTr'
import TableTd from './TableTd'
import TableTh from './TableTh'

interface ITable {
  children: ReactNode
  border?: 'bordered' | 'borderless' | ''
  striped?: boolean
  hover?: boolean
  size?: 'sm' | 'lg'
  className?: string
  dataTestId?: string
}

const constructClassNames = (border = '', striped = false, hover = false, size, className = '') => {
  const sizeClass = size ? `hot-table--${size}` : ''
  const borderClass = `hot-table--${border}`
  const stripedClass = striped && `hot-table--striped`
  const hoverClass = hover && `hot-talbe--hover`

  return `hot-table ${borderClass} ${stripedClass} ${hoverClass} ${sizeClass} ${className}`.trim()
}

const Table = ({
  children,
  border = '',
  striped = false,
  hover = false,
  size,
  className = '',
  dataTestId = 'table-component'
}: ITable) => {
  return (
    <table className={constructClassNames(border, striped, hover, size, className)} data-testid={dataTestId}>
      {children}
    </table>
  )
}

Table.Td = TableTd
Table.Tr = TableTr
Table.Th = TableTh
Table.Header = TableHeader
Table.Body = TableBody

export default Table
