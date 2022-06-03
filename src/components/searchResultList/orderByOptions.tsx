import React, { useState } from 'react'

import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'
import ModalFooter from 'components/basic/Modal/Footer'

import { Button, Form } from 'components/basic'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'ducks/index'

import './orderOptions.scss'

interface IPropTypes {
  isOpen: boolean,
  handleCloseModal: () => void,
  handleSetOrderBy: (selectedOrder: string) => void
}

const OrderByOptionsModal = ({ isOpen, handleCloseModal, handleSetOrderBy }: IPropTypes) => {
  const { t } = useTranslation()
  const { selectedOrderBy } = useSelector(({ filters }: RootState) => filters)

  const [currentChecked, setCurrentChecked] = useState(selectedOrderBy)

  const radioOptions = [
    { id: 'hottest', label: t('hottest.title'), isChecked: currentChecked === 'hottest' },
    { id: 'dearest', label: t('dearests.title'), isChecked: currentChecked === 'dearest' }
  ]

  const handleChangeCurrentSelected = id => {
    setCurrentChecked(id)
  }

  const handleClearOrderBy = () => {
    setCurrentChecked('')
    handleSetOrderBy('')
  }

  const handleApply = () => {
    setCurrentChecked(currentChecked)
    handleSetOrderBy(currentChecked)
    handleCloseModal()
  }

  return (
    <Modal
      className="_w-full hot-dropdocked"
      isOpen={isOpen}
      onClose={handleCloseModal}>
      <ModalHeader>
        <h4 className="_mb-0">
          {t('general.filter')}
        </h4>
      </ModalHeader>
      <ModalBody className="seacrh-result-modal _w-full _p-4">
        <Form.RadioGroup radios={radioOptions} group="orderBy" onChangeHandler={handleChangeCurrentSelected} />
      </ModalBody>
      <hr />
      <ModalFooter>
        <div className="hot-col-6 _p-0">
          <Button
            onClick={handleClearOrderBy}>
            {t('general.clear')}
          </Button>
        </div>
        <div className="hot-col-6 _p-0 _d-flex _justify-content-end">
          <Button
            variation="primary"
            onClick={handleApply}>
            {t('general.apply')}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default OrderByOptionsModal
