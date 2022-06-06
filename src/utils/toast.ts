import platformMessage from './platformMessage'
import { MessageActions, MessageTypes } from './constants'

const showMessage = (message: string, type = MessageTypes.SUCCESS) => {
  platformMessage(MessageActions.PLATFORM_ALERT, {
    type,
    content: message
  })
}

export const showErrorAlert = (message: string) => {
  showMessage(message, MessageTypes.ERROR)
}

export const showSuccessAlert = (message: string) => {
  showMessage(message)
}
