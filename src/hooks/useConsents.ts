import { useContext } from 'react'
import ConsentsContext from 'state/consents'

const useConsents = () => useContext(ConsentsContext)

export default useConsents
