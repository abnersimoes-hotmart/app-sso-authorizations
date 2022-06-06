export interface IUser {
  token: string
  profile: {
    id: number
    name: string
    locale: string
    ucode: string
  }
}
