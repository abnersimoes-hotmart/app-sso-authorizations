import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'

import { DefaultIconSize } from 'utils/constants'

interface IPropTypes {
  iconName: IconName
  className?: string
  width?: number
  height?: number
  fontSize?: number
  type: string
}

const Icon = ({
  type = 'regular',
  iconName,
  className = '',
  width,
  height,
  fontSize = DefaultIconSize
}: IPropTypes) => {
  const prefixTypes = {
    regular: 'far',
    solid: 'fa',
    light: 'fal'
  }

  const prefix = prefixTypes[type]
  const classes = `${className} ${fontSize ? `_text-${fontSize}` : ''}`

  return <FontAwesomeIcon icon={[prefix, iconName]} className={classes} style={{ width, height }} />
}

export default Icon
