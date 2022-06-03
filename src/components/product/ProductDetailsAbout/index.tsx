import React from 'react'

import AboutProduct from './AboutProduct'
import AboutProducer from './AboutProducer'
import ProductOpinions from './ProductOpinions'

const ProductDetailsAbout = () => {
  return (
    <div>
      <AboutProducer />
      <hr />
      <AboutProduct />
      <hr />
      <ProductOpinions />
      <hr />
    </div>
  )
}

export default ProductDetailsAbout
