import React, { ReactNode } from 'react'

interface IPropTypes {
  children: ReactNode
  prepend: string | Element
  append: string | Element
}

const InputGroup = ({ children, prepend, append }: IPropTypes) => {
  return (
    <hot-input-group>
      {prepend && (
        <div slot="prepend" className="hot-input-group__prepend">
          {prepend}
        </div>
      )}
      {children}
      {append && (
        <div slot="append" className="hot-input-group__append">
          {append}
        </div>
      )}
    </hot-input-group>
  )
}

export default InputGroup
