import { useEffect } from 'react'

const useInputBlur = (ref, onBlur) => {
  useEffect(() => {
    const handleBlur = e => {
      if (onBlur) {
        onBlur(e)
      }
    }

    const current = ref.current

    current.addEventListener('blur', handleBlur)
    return () => {
      current.removeEventListener('blur', handleBlur)
    }
  })
}

export default useInputBlur
