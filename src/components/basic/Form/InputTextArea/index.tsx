import React, { ChangeEvent } from 'react'

interface IPropTypes {
  className?: string
  placeholder?: string
  rows?: number
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const InputTextArea = ({ className = '', placeholder = '', rows = 3, handleChange }: IPropTypes) => {
  return (
    <textarea
      onChange={e => handleChange(e)}
      className={`hot-form__input ${className}`}
      placeholder={placeholder}
      rows={rows}
    />
  )
}

export default InputTextArea
