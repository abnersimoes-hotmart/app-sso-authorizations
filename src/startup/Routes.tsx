import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { ErrorBoundary } from 'components/error'
import { RouteNames } from 'utils/constants'
import { Loader, Breadcrumb } from 'components/basic'
import { RootState } from 'ducks/index'

const Home = lazy(() => import('pages/home'))
const ProductDetails = lazy(() => import('pages/details'))
const SearchResults = lazy(() => import('pages/search'))
const FavoriteResults = lazy(() => import('pages/favorites'))
const CommentsResults = lazy(() => import('pages/comments'))

const casRoutes = () => {
  if (process.env.NODE_ENV === 'development' && process.env.IS_CAS) {
    return (
      <>
        <Route exact path="/auth/logout" component={() => <Loader />} />
        <Route exact path="/auth/login" component={() => <Loader />} />
        <Route exact path="/auth/renew" component={() => <Loader />} />
      </>
    )
  }

  return null
}

const Routes = () => {
  const { breadcrumb } = useSelector(({ breadcrumb }: RootState) => breadcrumb)

  return (
    <Suspense fallback={<Loader />}>
      <hot-toast />
      <Breadcrumb breadcrumb={breadcrumb} />
      <ErrorBoundary>
        <Switch>
          <Route exact path={RouteNames.ROOT}>
            <Home />
          </Route>

          <Route path={`${RouteNames.PRODUCT_DETAILS}`}>
            <ProductDetails />
          </Route>

          <Route path={`${RouteNames.SEARCH_RESULTS}`}>
            <SearchResults />
          </Route>

          <Route path={`${RouteNames.FAVORITE_RESULTS}`}>
            <FavoriteResults />
          </Route>

          <Route path={`${RouteNames.COMMENTS_RESULTS}`}>
            <CommentsResults />
          </Route>
          {casRoutes()}
          <Redirect to={RouteNames.ROOT} />
        </Switch>
      </ErrorBoundary>
    </Suspense>
  )
}

export default Routes
