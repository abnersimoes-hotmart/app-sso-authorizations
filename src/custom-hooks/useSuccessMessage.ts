import { useCallback } from 'react'

import { showSuccessAlert } from 'utils/toast'

const useSuccessMessage = translationFunction => {
  return useCallback(
    () => {
      showSuccessAlert(translationFunction('general.done'))
    }, [translationFunction]
  )
}

export default useSuccessMessage
