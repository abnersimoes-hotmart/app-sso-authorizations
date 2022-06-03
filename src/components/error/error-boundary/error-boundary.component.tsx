import React, { Component, ReactNode } from 'react'
import { Error } from 'components/error'

interface IState {
  hasError: boolean,
}

interface IProps {
  children?: ReactNode
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <Error />
    }

    return this.props.children
  }
}

export default ErrorBoundary
