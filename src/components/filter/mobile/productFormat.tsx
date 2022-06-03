import React, { ReactNode, useMemo } from 'react'

import { Form } from 'components/basic'
import { useTranslation } from 'react-i18next'

import { IFormat } from 'ducks/filters/filtesrInterfaces'

interface IRadioInfo {
  id: string | number,
  label: string | ReactNode,
  isChecked: boolean
}

interface IPropTypes {
  handleSelectedProductFormat: (format: string) => void,
  selectedProductFormat: string,
  formats: Array<IFormat>
}

const ProductFormatMobile = ({ handleSelectedProductFormat, selectedProductFormat, formats }: IPropTypes) => {
  const { t } = useTranslation()

  const formatList = useMemo(() => {
    const list: Array<IRadioInfo> = []

    formats.forEach(format => {
      const formatId = `product-format-${format.id}`

      list.push(
        {
          id: formatId,
          label: t(`product_details.${format.name}`),
          isChecked: selectedProductFormat === formatId
        }
      )
    })

    return list
  }, [formats, selectedProductFormat, t])

  return (
    <Form.RadioGroup
      radios={formatList}
      group="productFormat"
      onChangeHandler={handleSelectedProductFormat} />
  )
}

export default ProductFormatMobile
