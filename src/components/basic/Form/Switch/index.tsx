import React, { ChangeEvent, ReactNode } from 'react'

import './style.scss'

interface IPropTypes {
  id: string
  label: string | ReactNode
  className?: string
  checked?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Switch = ({ id, label, className = '', checked = true, onChange }: IPropTypes) => {
  return (
    <div className={`hot-form hot-form--custom hot-form--switch ${className}`.trim()}>
      <input type="checkbox" className="hot-form__input" id={id} checked={checked} onChange={onChange} />
      <label className="hot-form__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

export default Switch
