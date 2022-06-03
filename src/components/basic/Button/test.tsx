import React, { ReactNode } from 'react'

import Button from '.'
import { userEvent, render, screen } from 'config/testSuit'

const onClick = jest.fn()

interface IButton {
  children?: ReactNode,
  type?: 'submit' | 'button' | 'reset',
  variation?: string,
  size?: 'sm' | 'lg' | null,
  disabled?: boolean,
  id?: any,
  className?: string
}

const setup = (props: IButton = {}, rerender?: (ui: React.ReactElement) => void) => {
  if (rerender) {
    rerender(
      <Button {...props} onClick={onClick}>
        test
      </Button>
    )

    return null
  }

  return render(
    <Button {...props} onClick={onClick}>
      test
    </Button>
  )
}

describe('Button', () => {
  it('should call onClick with passed function', () => {
    setup()
    const button = screen.getByRole('button')

    userEvent.click(button)
    expect(onClick).toHaveBeenCalled()
  })

  it('should disable button', () => {
    setup({ disabled: true })
    const button = screen.getByRole('button')

    expect(button).toBeDisabled()
  })

  it('should change button type by props', () => {
    setup({ type: 'submit' })

    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('should mount class using variation prop', () => {
    const { rerender } = setup() || {}

    expect(screen.getByRole('button')).toHaveClass('hot-button')

    setup({ variation: 'primary' }, rerender)
    expect(screen.getByRole('button')).toHaveClass('hot-button hot-button--primary')

    setup({ variation: 'secondary' }, rerender)
    expect(screen.getByRole('button')).toHaveClass('hot-button hot-button--secondary')

    setup({ variation: 'tertiary' }, rerender)
    expect(screen.getByRole('button')).toHaveClass('hot-button hot-button--tertiary')

    setup({ variation: 'success' }, rerender)
    expect(screen.getByRole('button')).toHaveClass('hot-button hot-button--success')
  })
})
