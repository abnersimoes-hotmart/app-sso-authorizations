import React, { useRef, useCallback, ReactNode } from 'react'

import { useInputChange } from 'src/custom-hooks'

interface OptionsItem {
  value: string | number
  text: string | ReactNode
}
interface IPropTypes {
  id: string
  label?: string
  value?: string | number
  placeholder?: string
  disabled?: boolean
  options: Array<OptionsItem>
  onChange?: ((event: Event) => void) | ((value: string) => void)
  className?: string
  optionClassName?: string
  inputClassName?: string
  labelClassName?: string
  hasError?: boolean
  errorMessage?: string
  loading?: boolean
}

const InputSelect = ({
  id,
  onChange,
  label = '',
  value = '',
  placeholder = '',
  className = '',
  disabled = false,
  hasError = false,
  loading = false,
  optionClassName = '',
  inputClassName = '',
  labelClassName = '',
  options = []
}: IPropTypes) => {
  const inputSelectRef = useRef(null)

  useInputChange(inputSelectRef, onChange)

  const getIfIsOptionsSelected = useCallback(
    optionValue => {
      if (optionValue === value) {
        return { selected: '' }
      }

      return {}
    },
    [value]
  )

  const optionalProps = {
    ...(hasError ? { invalid: '' } : {}),
    ...(disabled ? { disabled: '' } : {}),
    ...(loading ? { loading: '' } : {})
  }

  return (
    <div className={`hot-form ${className}`.trim()}>
      {label && (
        <label htmlFor={id} className={`hot-form__label ${labelClassName}`.trim()}>
          {label}
        </label>
      )}

      <hot-select
        id={id}
        ref={inputSelectRef}
        class={`_w-full ${inputClassName}`}
        placeholder={placeholder}
        {...optionalProps}
      >
        <div className="_hot-scroll">
          {options.map(option => {
            return (
              <hot-select-option
                key={option.value}
                value={option.value}
                class={optionClassName}
                {...getIfIsOptionsSelected(option.value)}
              >
                {option.text}
              </hot-select-option>
            )
          })}
        </div>
      </hot-select>
    </div>
  )
}

InputSelect.displayName = 'InputSelect'

export default InputSelect
