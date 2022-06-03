import React from 'react'

/**
 * Custom Elements workaround
 */

jest.mock('react-slick', () => {
  const SliderMock = ({ children }) => <div>{children}</div>
  return SliderMock
})

jest.mock('../../src/components/product/ProductDivulgationMaterial/MaterialCarousel', () => {
  const MaterialCarouselMock = () => <div />

  return MaterialCarouselMock
})

jest.mock('../../src/components/basic/Modal', () => {
  const ModalMock = ({ children }) => <div>{children}</div>
  ModalMock.Header = ({ children }) => <div>{children}</div>
  ModalMock.Body = ({ children }) => <div>{children}</div>
  ModalMock.Footer = ({ children }) => <div>{children}</div>

  return ModalMock
})

jest.mock('../../src/components/basic/Form/InputSelect', () => {
  const InputSelectMock = ({ children }) => <div>{children}</div>
  return InputSelectMock
})

jest.mock('../../src/components/basic/Tag', () => {
  const TagMock = () => <div />
  return TagMock
})

jest.mock('../../src/components/basic/Loader/', () => {
  const LoadingMock = ({ children }) => <div>{children}</div>
  return LoadingMock
})
