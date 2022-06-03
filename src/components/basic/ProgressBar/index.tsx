import React from 'react'

interface IProgressBarProps {
  className?: string
  size?: 'sm' | 'lg' | ''
  type?: 'outer-label' | 'label' | ''
  value?: string
}

const ProgressBar = ({ className = '', size = '', type = '', value = '' }: IProgressBarProps) => {
  const sizeClass = size ? `hot-progress--${size}` : ''
  const typeClass = type ? `hot-progress--${type}` : 'hot-progress'

  const classes = `${className} ${sizeClass} ${typeClass}`.trim()

  return <hot-progress class={classes} value={value} />
}

export default ProgressBar
