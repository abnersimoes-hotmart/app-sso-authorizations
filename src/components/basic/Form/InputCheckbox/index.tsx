import React, { ReactNode, ChangeEvent } from 'react'

import './style.scss'

const constructClassName = (inputClassName, hasError) =>
  `hot-custom-control__input${hasError ? ' is-invalid' : ''} ${inputClassName}`.trim()

interface IPropTypes {
  id: string
  label: ReactNode | string
  checked: boolean
  inputClassName?: string
  className?: string
  disabled?: boolean
  hasError?: boolean
  errorMessage?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  hint?: string
  readOnly?: boolean
}

const InputCheckbox = ({
  id,
  onChange,
  label = '',
  className = '',
  inputClassName = '',
  disabled = false,
  hasError = false,
  checked = false,
  readOnly = false
}: IPropTypes) => {
  const inputClassNameConstructed = constructClassName(inputClassName, hasError)

  return (
    <div className={`hot-form hot-form--custom hot-form--checkbox ${className}`}>
      <input
        id={id}
        data-testid="checkbox-component-input"
        checked={checked}
        type="checkbox"
        disabled={disabled}
        onChange={onChange}
        readOnly={readOnly}
        className={`_mr-2 hot-form__input ${inputClassNameConstructed}`}
      />

      <label className="hot-form__label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}

InputCheckbox.displayName = 'InputCheckbox'

export default InputCheckbox
