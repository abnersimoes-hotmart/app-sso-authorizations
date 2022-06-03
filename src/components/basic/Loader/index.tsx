import React from 'react'

interface IPropTypes {
  className?: string
}

const Loader = ({ className }: IPropTypes) => {
  return (
    <div className={`_w-full _d-flex _justify-content-center ${className}`}>
      <hot-loading />
    </div>
  )
}

export default Loader
