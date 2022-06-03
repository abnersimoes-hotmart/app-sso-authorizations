import React, { ReactNode } from 'react'

import { Icon } from 'components/basic'
import Slider, { CustomArrowProps } from 'react-slick'
import { isExtraSmallScreen } from 'utils/constants'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.scss'
interface IPropTypes {
  qtdPerRow?: number,
  qtdPerRowMd?: number,
  qtdPerRowSm?: number,
  qtdPerRowXs?: number,
  dots?: boolean,
  infinite?: boolean,
  className?: string,
  children?: ReactNode,
  title?: string | ReactNode,
  id: string,
  showArrows?: boolean,
  centerMode?: boolean,
  autoplay?: boolean,
  autoplaySpeed?: number,
  afterChange?(currentSlide: number): void,
  beforeChange?(currentSlide: number, nextSlide: number): void
}

const NextArrow = ({ onClick, className }: CustomArrowProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div
    className={`_text-gray-800 rounded-button rounded-button-arrow _bg-white ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}>
    <Icon
      height={16}
      type="regular"
      iconName="chevron-right"
      className="_p-0" />
  </div>
)

const PrevArrow = ({ onClick, className }: CustomArrowProps) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
  <div
    className={`_text-gray-800 rounded-button rounded-button-arrow _bg-white ${className}`}
    onClick={onClick}
    role="button"
    tabIndex={0}>
    <Icon
      height={16}
      type="regular"
      iconName="chevron-left"
      className="_p-0" />
  </div>
)

const Carousel = ({
  children,
  qtdPerRow = 4,
  qtdPerRowMd = 3,
  qtdPerRowSm = 2,
  qtdPerRowXs = isExtraSmallScreen ? 1.3 : 1.5,
  showArrows = true,
  dots = false,
  infinite = false,
  autoplay = false,
  beforeChange,
  afterChange
}: IPropTypes) => {
  const settings = {
    beforeChange,
    afterChange,
    slidesToShow: qtdPerRow,
    slidesToScroll: qtdPerRow,
    autoplay,
    infinite,
    arrows: showArrows,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: qtdPerRowMd,
          slidesToScroll: qtdPerRowMd
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: qtdPerRowSm,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: qtdPerRowXs,
          slidesToScroll: 1
        }
      }
    ]
  }

  return (
    <Slider className="carousel" {...settings}>
      {children}
    </Slider>
  )
}

export default Carousel
