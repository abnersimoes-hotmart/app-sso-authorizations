import React, { useState, useRef, useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import Carousel from 'components/general/Carousel'
import { IMaterialModal } from 'utils/interfaces/productInformation'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { Button, Icon } from 'components/basic'

import { handleImageError } from 'utils/productDefaultImage'

import './style.scss'

interface IPropTypes {
  materialList: Array<IMaterialModal>
  isOpen?: boolean
}

const amprsandInvalidPosition = -1

const getVideoId = text => {
  let regex = text.split('v=')[1]
  const ampersandPosition = regex.indexOf('&' || '=' || '?')

  if (ampersandPosition !== amprsandInvalidPosition) {
    regex = regex.substring(0, ampersandPosition)
  }
  const urls: Array<string> = []

  text.replace(regex, url => urls.push(url))
  return urls
}

const MaterialCarousel = ({ materialList, isOpen }: IPropTypes) => {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalPages = materialList.length
  const videoIframeRef = useRef<HTMLIFrameElement>(null)

  const handleAfterChange = (index: number) => {
    setCurrentSlide(index + 1)
  }

  useEffect(() => {
    if (videoIframeRef.current && !isOpen) {
      const iframe = videoIframeRef.current.querySelector('iframe')
      const video = videoIframeRef.current.querySelector('video')

      if (iframe) {
        const iframeSrc = iframe.src

        iframe.src = iframeSrc
      }
      if (video) {
        video.pause()
      }
    }
  }, [currentSlide, isOpen])

  const renderCurrentPage = () => {
    return (
      <div className="carousel-current-page-divulgation-material _position-absolute _text-center">
        <span className="_text-gray-800">
          {currentSlide} / {totalPages}
        </span>
      </div>
    )
  }

  const renderContent = (type, name, source) => {
    switch (type) {
      case 'image':
        return (
          <div className="carousel-items _d-flex _flex-glow-1 _align-items-center _justify-content-center _bg-gray-100">
            <TransformWrapper initialScale={1} initialPositionX={0} initialPositionY={0}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <div className="_d-flex _flex-glow-1 _align-items-center _justify-content-center _position-relative _p-4 _text-center">
                  <div className="carousel-items-banner _overflow-hidden _d-flex _align-items-center _justify-content-center">
                    <TransformComponent>
                      <img onError={handleImageError} src={source} alt={t(name)} />
                    </TransformComponent>
                  </div>
                  <div className="_position-absolute carousel-items-controls">
                    <Button onClick={() => zoomOut()} variation="tertiary">
                      <Icon type="regular" iconName="minus" width={16} height={16} className="_p-0" />
                    </Button>
                    <Button onClick={() => resetTransform()} variation="tertiary">
                      <Icon type="regular" iconName="search-minus" width={16} height={16} className="_p-0" />
                    </Button>
                    <Button onClick={() => zoomIn()} variation="tertiary">
                      <Icon type="regular" iconName="plus" width={16} height={16} className="_p-0" />
                    </Button>
                  </div>
                </div>
              )}
            </TransformWrapper>
          </div>
        )
      case 'externalLink':
        return (
          <div className="_overflow-hidden _overflow-y-auto">
            <div className="carousel-items _d-flex _bg-gray-100">
              <a href={source} rel="noopener noreferrer" target="_blank">
                {source}
              </a>
            </div>
          </div>
        )
      case 'video':
        if (source.includes('youtu')) {
          if (source.includes('watch')) {
            const videoId = getVideoId(source)
            const videoURL = `https://www.youtube.com/embed/${videoId}?rel=0&amp;showinfo=0`

            return (
              <div className="_d-block _w-full">
                <a href={source} target="_blank" rel="noreferrer">
                  {source}
                </a>
                <div className="carousel-items _overflow-hidden _d-flex _align-items-center _justify-content-center _bg-gray-100 ">
                  <div ref={videoIframeRef} className="carousel-items-video">
                    <iframe
                      className="youtube-video"
                      width="320"
                      title={source}
                      src={videoURL}
                      frameBorder="0"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="_overflow-hidden _overflow-y-auto">
                <div className="carousel-items _d-flex _bg-gray-100">
                  <a href={source} rel="noopener noreferrer" target="_blank">
                    {source}
                  </a>
                </div>
              </div>
            )
          }
        } else {
          return (
            <div className="_my-4 _p-3 carousel-items ">
              <h6 className="_m-0 _text-1 _text-md-2 _text-gray-500">{t('product_details.materials.invalid_link')}</h6>
            </div>
          )
        }
      default:
        return (
          <div className="_overflow-hidden _overflow-y-auto">
            <div className="carousel-items _d-flex _bg-gray-100">
              <p className="_p-4 _m-0">{source}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="_position-relative material-carousel">
      <Carousel
        id="materialList"
        qtdPerRow={1}
        qtdPerRowMd={1}
        qtdPerRowSm={1}
        qtdPerRowXs={1}
        afterChange={handleAfterChange}
      >
        {materialList.map(({ type, name, source }) => (
          <div key={type}>
            <h4 className="_text-3 _font-weight-light">{t(name)}</h4>
            <div className="material-carousel-content _d-flex">{renderContent(type, name, source)}</div>
          </div>
        ))}
      </Carousel>
      {renderCurrentPage()}
    </div>
  )
}

export default MaterialCarousel
