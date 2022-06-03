import React, { Suspense, useEffect, useCallback, useState } from 'react'

import { sendPageViewEvent } from 'utils/gaEvent'
import { useVulcanoContext } from 'src/VulcanoContext'
import { useTranslation, Trans } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'

import { setBreadcrumb } from 'ducks/breadcrumb'
import { setProductDetails } from 'ducks/product'
import { Loader } from 'components/basic'
import { IMaterialModal, IMaterialTags, IProductDetails } from 'utils/interfaces/productInformation'
import { getProductDetails, getProductDivulgationMaterial } from 'services/market'
import { CarouselDefaultPages, CarouselDefaultRows, RouteNames } from 'utils/constants'
import { useFetchOtherProductsFromProducerQuery } from 'api/useFetchOtherProductsFromProducerQuery'
import {
  ProductDetailInfo,
  ProductDetailsAbout,
  ProductCarousel,
  ProductDivulgationMaterial
} from 'components/product'
import { RootState } from 'ducks/index'

interface IMaterial {
  affiliateResourceType: string
  id: number
  imageCode: string
  registrationDate: string
  title?: string
  value: string
}

const ProductDetails = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [currentProductInfo, setCurrentProductInfo] = useState<IProductDetails>()

  const queryParams = new URLSearchParams(window.location.search)
  const producerUcode = queryParams.get('producerUcode') || currentProductInfo?.userProfile.ucode
  const productUcode = queryParams.get('productUcode') || currentProductInfo?.productDetails.ucode
  const pullSessionId = queryParams.get('pullSessionId')
  const { user: { profile: { locale: language, id } } } = useVulcanoContext()

  const { productInfo } = useSelector(({ product }: RootState) => product)

  const [isLoadingDetails, setIsLoadingDetails] = useState(true)
  const [isLoadingMaterials, setIsLoadingMaterials] = useState(true)
  const [divulgationMaterial, setDivulgationMaterial] = useState<Array<IMaterial>>([])
  const [divulgationMaterialModal, setDivulgationMaterialModal] = useState<Array<IMaterialModal>>([])
  const [materialsTags, setMaterialsTags] = useState<Array<IMaterialTags>>([])
  const [imagesCount, setImagesCount] = useState(0)
  const [videosCount, setVideosCount] = useState(0)
  const [tweetsCount, setTweetsCount] = useState(0)
  const [emailsCount, setEmailsCount] = useState(0)
  const [externalFoldersCount, setExternalFolderCount] = useState(0)

  const { t } = useTranslation()
  const history = useHistory()

  const { isFetched, refetch, ...fetchOtherProductsFromProducerQuery } = useFetchOtherProductsFromProducerQuery(
    productUcode,
    producerUcode,
    CarouselDefaultPages,
    CarouselDefaultRows
  )

  useEffect(() => {
    const cluster = sessionStorage.getItem('cluster')
    const pageView = {
      subsection2: 'View product',
      logged: Boolean(id),
      language,
      productID: currentProductInfo?.productDetails.id,
      productName: currentProductInfo?.productDetails.name,
      producerName: currentProductInfo?.userProfile.name,
      ...(cluster && cluster !== 'undefined' && { cluster })
    }

    sendPageViewEvent(pageView)
  }, [currentProductInfo, id, language, productInfo])

  const fetchProductDetails = useCallback(async () => {
    try {
      setIsLoadingDetails(true)

      const params = {
        productUcode
      }
      const response = await getProductDetails(params)

      setCurrentProductInfo(response)
      dispatch(setProductDetails(response))
    } catch (error: any) {
      if (error.response.status === 404) {
        history.replace(RouteNames.ROOT)
      }
    } finally {
      setIsLoadingDetails(false)
    }
  }, [history, dispatch, productUcode])

  const fetchMaterialList = useCallback(async () => {
    try {
      if (producerUcode && productUcode) {
        const params = {
          producerUcode,
          productUcode
        }
        const response = await getProductDivulgationMaterial(params)

        setDivulgationMaterial(response)
      }
    } finally {
      setIsLoadingMaterials(false)
    }
  }, [producerUcode, productUcode])

  const generateBreadcrumb = useCallback(() => {
    const breadcrumb = [
      {
        item: t('general.title'),
        link: `${RouteNames.ROOT}`,
        isActive: false
      },
      {
        item: `${t('general.product')} ${currentProductInfo?.productDetails.id}`,
        link: `${RouteNames.PRODUCT_DETAILS}&productUcode=${producerUcode}&producer=${productUcode}`,
        isActive: true
      }
    ]

    dispatch(setBreadcrumb(breadcrumb))
  }, [currentProductInfo, dispatch, producerUcode, productUcode, t])

  const generateMaterialListModal = useCallback(() => {
    const materials: Array<IMaterialModal> = []

    if (divulgationMaterial && divulgationMaterial.length > 0) {
      let images = 0
      let videos = 0
      let tweets = 0
      let emails = 0
      let externalFolders = 0

      divulgationMaterial.forEach(material => {
        const materialType = material.affiliateResourceType

        if (materialType.includes('BANNER')) {
          images += 1
          materials.push({ type: 'image', name: 'product_details.materials.image', source: material.value })
        }

        if (materialType.includes('EXTERNAL_FOLDER_LINK')) {
          externalFolders += 1
          materials.push({ type: 'externalLink', name: 'product_details.materials.external_link', source: material.value })
        }

        if (materialType.includes('VIDEO')) {
          videos += 1
          materials.push({ type: 'video', name: 'product_details.materials.video', source: material.value })
        }

        if (materialType.includes('TWEET')) {
          tweets += 1
          materials.push({ type: 'tweet', name: 'product_details.materials.tweet', source: material.value })
        }

        if (materialType.includes('EMAIL')) {
          emails += 1
          materials.push({ type: 'email', name: 'product_details.materials.email', source: material.value })
        }
      })
      setImagesCount(images)
      setVideosCount(videos)
      setTweetsCount(tweets)
      setEmailsCount(emails)
      setExternalFolderCount(externalFolders)
      setDivulgationMaterialModal(materials)
    }
  }, [divulgationMaterial])

  const generateMaterialTagsList = useCallback(() => {
    const materialsButtons = [
      {
        id: 'image',
        type: 'product_details.materials.image',
        count: imagesCount
      }, {
        id: 'video',
        type: 'product_details.materials.video',
        count: videosCount
      }, {
        id: 'externalLink',
        type: 'product_details.materials.external_link',
        count: externalFoldersCount
      }, {
        id: 'tweet',
        type: 'product_details.materials.tweet',
        count: tweetsCount
      }, {
        id: 'email',
        type: 'product_details.materials.email',
        count: emailsCount
      }
    ]

    if (imagesCount + videosCount + externalFoldersCount + tweetsCount + emailsCount) {
      setMaterialsTags(materialsButtons)
    } else {
      setMaterialsTags([])
    }
  }, [emailsCount, externalFoldersCount, imagesCount, tweetsCount, videosCount])

  useEffect(() => {
    fetchProductDetails()
    fetchMaterialList()
  }, [fetchProductDetails, fetchMaterialList])

  useEffect(() => {
    generateMaterialTagsList()
    generateMaterialListModal()
  }, [generateMaterialTagsList, generateMaterialListModal])

  useEffect(() => {
    generateBreadcrumb()
  }, [generateBreadcrumb])

  const fetchOtherProductsFromProducer = useCallback(() => {
    if (isFetched) {
      refetch()
    }
  }, [isFetched, refetch])

  useEffect(() => {
    fetchOtherProductsFromProducer()
  }, [
    fetchOtherProductsFromProducer,
    location.search
  ])

  const renderOtherProductsCarousel = () => {
    if (fetchOtherProductsFromProducerQuery.isFetching) {
      return <Loader />
    }

    if (fetchOtherProductsFromProducerQuery.data && fetchOtherProductsFromProducerQuery.data.content.length > 0) {
      return (
        <ProductCarousel
          className="_mt-8"
          id={'other_products'}
          isLoading={fetchOtherProductsFromProducerQuery.isLoading}
          title={t('other_products_from_producer.title')}
          subtitle={<Trans
            i18nKey={'other_products_from_producer.description'}
            values={{
              producerName: currentProductInfo?.userProfile.name
            }}
          />}
          seeMoreLink={t('general.see_more')}
          products={fetchOtherProductsFromProducerQuery.data.content} />
      )
    }

    return null
  }

  return (
    <Suspense fallback={<Loader />}>
      <div className="page-containers _bg-gray-100 ">
        <div className="hot-container">
          {
            isLoadingDetails
              ? <Loader />
              : <>
                <ProductDetailInfo pullSessionId={pullSessionId || ''} />
                <ProductDetailsAbout />
              </>
          }
          <ProductDivulgationMaterial
            isLoadingMaterials={isLoadingMaterials}
            materialListModal={divulgationMaterialModal}
            materialsTags={materialsTags} />
          {
            renderOtherProductsCarousel()
          }
        </div>
      </div>
    </Suspense>
  )
}

export default ProductDetails
