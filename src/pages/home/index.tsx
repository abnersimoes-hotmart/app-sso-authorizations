import React, { Suspense } from 'react'
import { useVulcanoContext } from 'context/VulcanoContext'
import { Loader } from 'components/basic'
import '../style.scss'

const Home = () => {
  const {
    user: {
      profile: { locale }
    }
  } = useVulcanoContext()

  return (
    <Suspense fallback={<Loader />}>
      <h1>{locale}</h1>
    </Suspense>
  )
}

export default Home
