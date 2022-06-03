export const reviewRatingFormat = (rating: number, decimals = 1): string => {
  if (rating === 0) {
    return '0'
  }

  if (rating >= 5) {
    return '5.0'
  }

  return rating.toFixed(decimals)
}
