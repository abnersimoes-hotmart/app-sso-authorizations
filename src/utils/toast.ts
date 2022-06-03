import platformMessage from './platformMessage'
import { MessageActions, MessageTypes } from './constants'

const showMessage = (message, type = MessageTypes.SUCCESS) => {
  platformMessage(MessageActions.PLATFORM_ALERT, {
    type,
    content: message
  })
}

export const showErrorAlert = message => {
  showMessage(message, MessageTypes.ERROR)
}

export const showSuccessAlert = message => {
  showMessage(message)
}
