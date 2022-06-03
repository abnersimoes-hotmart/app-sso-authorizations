import React from 'react'

/**
 * Custom Elements workaround
 */

jest.mock('../../src/components/basic/Modal', () => {
  const ModalMock = ({ children }) => <div>{children}</div>
  ModalMock.Header = ({ children }) => <div>{children}</div>
  ModalMock.Body = ({ children }) => <div>{children}</div>
  ModalMock.Footer = ({ children }) => <div>{children}</div>

  return ModalMock
})

jest.mock('../../src/components/basic/Tag', () => {
  const TagMock = () => <div />
  return TagMock
})

jest.mock('../../src/components/basic/Loader/', () => {
  const LoadingMock = ({ children }) => <div>{children}</div>
  return LoadingMock
})
