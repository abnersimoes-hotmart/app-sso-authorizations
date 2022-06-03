import DefaultProductImage from 'src/assets/images/defaultProductImage.svg'

export const handleImageError = e => {
  e.target.src = DefaultProductImage
}
