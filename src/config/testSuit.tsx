import React from 'react'

import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory } from 'history'

export const renderWithRouter = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] })
  } = {}
) => {
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children }) => (
    <Router history={history}>{children}</Router>
  )

  return {
    ...render(
      <Wrapper>{ui}</Wrapper>
    ),
    history
  }
}

export { userEvent }
// eslint-disable-next-line no-duplicate-imports
export * from '@testing-library/react'
