import { useEffect } from 'react'

const useInputChange = (ref, onChange) => {
  useEffect(() => {
    const handleChange = ({ detail }) => {
      onChange(detail)
    }

    const current = ref.current

    current.addEventListener('change', handleChange)
    return () => {
      current.removeEventListener('change', handleChange)
    }
  })
}

export default useInputChange
