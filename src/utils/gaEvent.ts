declare global {
  interface Window {
    dataLayer: Array<IDataLayer>;
  }
}

interface IDataLayer {
  event: string,
  section: string,
  subsection: string,
  subsection2?: string,
  subsection3?: string,
  logged: boolean,
  language: string,
  userId?: string | number,
  cluster: string,
  productID?: string,
  productName?: string,
  producerName: string
}

const sanitizeLanguage = analyticsEvent => {
  if (analyticsEvent.language) {
    analyticsEvent.language = `${analyticsEvent.language.toLowerCase() || ''}`
  }
  return analyticsEvent
}

export const pushIntoDataLayer = data => {
  const analyticsEvent = sanitizeLanguage(data)

  if (data && data.event) {
    window.dataLayer && window.dataLayer.push(analyticsEvent)
  } else {
    throw new Error('No event param provided to push into the dataLayer.')
  }
}

export const sendPageViewEvent = ({
  event = 'pageview',
  section = 'Platform',
  subsection = 'New Market',
  logged = false,
  ...eventData
}) => {
  pushIntoDataLayer({
    event,
    section,
    subsection,
    logged,
    ...eventData
  })
}

export const sendInteractionEvent = ({
  nonInteraction = false,
  eventCategory = 'Platform:NewMarket',
  eventAction = '',
  eventLabel = '',
  ...eventData
}) => {
  pushIntoDataLayer({
    'event': nonInteraction ? 'noninteraction' : 'interaction',
    'event_category': eventCategory,
    'event_action': eventAction,
    'event_label': eventLabel,
    ...eventData
  })
}
