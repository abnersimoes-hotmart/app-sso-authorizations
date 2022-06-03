
import { Environments } from 'utils/constants'

const isEnvironmentEqualTo = environment => {
  return process.env.NODE_ENV === environment
}

export const IS_DEVELOPMENT_ENVIRONMENT = (
  isEnvironmentEqualTo(Environments.DEVELOPMENT)
  && process.env.PRODUCTION === 'false'
)

export const IS_STAGING_ENVIRONMENT = (
  isEnvironmentEqualTo(Environments.PRODUCTION)
  && process.env.PRODUCTION === 'false'
)

export const IS_PRODUCTION_ENVIRONMENT = (
  isEnvironmentEqualTo(Environments.PRODUCTION)
  && process.env.PRODUCTION === 'true'
)
