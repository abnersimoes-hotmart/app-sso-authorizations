import React, { ReactNode } from 'react'

interface Radio {
  id: string | number
  label: string | ReactNode
  isChecked: boolean
}

interface IPropTypes {
  group: string
  radios: Array<Radio>
  onChangeHandler: (value: string) => void
}

const RadioGroup = ({ radios, group, onChangeHandler }: IPropTypes) => {
  const onChange = event => {
    onChangeHandler(event.target.id)
  }

  return (
    <div className="_w-full">
      {radios.map(radio => {
        return (
          <div key={radio.id} className="hot-form hot-form--custom hot-form--radio">
            <input
              type="radio"
              className="hot-form__input"
              id={radio.id.toString()}
              name={group}
              checked={radio.isChecked}
              onChange={onChange}
            />
            <label className="hot-form__label" htmlFor={radio.id.toString()}>
              {radio.label}
            </label>
          </div>
        )
      })}
    </div>
  )
}

export default RadioGroup
