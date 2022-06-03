import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from 'components/basic/Modal'
import ModalBody from 'components/basic/Modal/Body'
import ModalHeader from 'components/basic/Modal/Header'
import MaterialCarousel from './MaterialCarousel'
import { IMaterialModal, IMaterialTags } from 'utils/interfaces/productInformation'
import { Button, Icon, Loader } from 'components/basic'

import './style.scss'

interface IPropTypes {
  materialListModal: Array<IMaterialModal>,
  isLoadingMaterials: boolean,
  materialsTags: Array<IMaterialTags>
}

const ProductDivulgationMaterial = ({ isLoadingMaterials, materialListModal, materialsTags }: IPropTypes) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>()

  const seeMaterialsAction = () => {
    setIsOpen(true)
  }

  const generateMaterialTags = () => {
    if (isLoadingMaterials) {
      return <Loader />
    }

    if (materialsTags && materialsTags.length > 0) {
      return (
        <div className="_mt-8">
          <div className="hot-row _d-flex _mb-4 _align-items-center">
            <div className="hot-col-12 _d-flex _justify-content-start">
              <h3 className="_mb-4">{t('filters.labels.divulgation_material')}</h3>
            </div>
            <div className="hot-col-12 _d-flex _justify-content-md-end _justify-content-md-start">
              <Button
                variation="secondary"
                className="_border-0 _text-3"
                onClick={seeMaterialsAction}>
                {t('product_details.divulgation_material.see_materials')}
              </Button>
            </div>
          </div>
          <div className="hot-row _d-flex">
            {
              materialsTags.map(material => {
                if (material.count > 0) {
                  return (
                    <div key={material.id} className="hot-col-md-2 hot-col-sm-10 _w-full _border _border-gray-600 _rounded _p-3 _m-3">
                      <div className="_d-flex _justify-content-between _w-full">
                        <div>{t(material.type)}</div>
                        <div className="_float-right">{material.count}</div>
                      </div>
                    </div>
                  )
                }
                return null
              })
            }
          </div>
          <hr />
        </div>
      )
    }

    return null
  }

  return (
    <>
      {
        generateMaterialTags()
      }
      <Modal isOpen={isOpen}
        position="centered"
        onClose={() => setIsOpen(false)}
        className="material-modal hot-dropdocked">
        <ModalHeader>
          <div className="_d-flex _align-items-center _pt-2">
            <div className="_d-none _d-md-flex _mr-4 _p-4 _rounded-circle _bg-blue-lightest">
              <Icon type="regular" iconName="phone-laptop" width={24} height={24} className="_text-blue-dark" />
            </div>
            <div>
              <h4 className="_mb-2 _text-3 _text-md-4 _font-weight-light">
                {t('product_details.materials.modal_title')}
              </h4>
              <h6 className="_m-0 _text-1 _text-md-2 _text-gray-500">
                {t('product_details.materials.description')}
              </h6>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
          <MaterialCarousel isOpen={isOpen} materialList={materialListModal} />
        </ModalBody>
      </Modal>
    </>
  )
}

export default ProductDivulgationMaterial
