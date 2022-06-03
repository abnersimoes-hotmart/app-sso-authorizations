export interface IUser {
  token,
  profile: {
    id: number,
    name: string,
    locale: string,
  }
  isFromBrazil?: boolean
}

