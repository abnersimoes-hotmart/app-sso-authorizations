/* eslint-disable camelcase */
import AuthService, { Bootstrap } from '@hotmart/cas-js'
import { AuthServiceInstance } from '@hotmart/cas-js/dist/auth.service'

async function startCas() {
  return new Promise<any>((resolve, reject) => {
    const authService: AuthServiceInstance = new AuthService({
      client_id: process.env.CAS_CLIENT_ID,
      scope: 'openid profile user authorities email'
    })

    const bootstrap: any = new Bootstrap(authService)

    bootstrap.subscribe({
      next: (user, error) => {
        if (error || !user) {
          return reject(error || 'Cas authentication process error')
        }
        return resolve(user)
      }
    })
    bootstrap.start()
  })
}

export default startCas
