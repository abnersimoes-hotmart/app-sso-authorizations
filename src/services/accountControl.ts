import Request from '@hotmart/request'

export const userBlocks = () => {
  return Request('accountControl.userBlocks')
}
