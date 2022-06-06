import packageJSON from 'root/package.json'

const platformMessage = (type = '', data = {}) => {
  const message = {
    appName: packageJSON.name,
    type: `THIRD-PARTY-APP.${type}`,
    body: data
  }

  window.postMessage(message, window.location.origin)
}

export default platformMessage
