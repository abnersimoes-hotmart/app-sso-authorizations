export const formatUserLocale = locale => {
  const languages = {
    'pt-br': 'pt-br',
    'pt_br': 'pt-br',
    'es': 'es-es',
    'en': 'en-us',
    'fr': 'fr',
    'ar': 'ar-ar',
    'ja': 'ja-ja'
  }

  return languages[locale?.toLowerCase()] || 'en-us'
}

export default formatUserLocale
