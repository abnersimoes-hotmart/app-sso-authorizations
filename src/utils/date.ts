import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/pt-br'
import 'dayjs/locale/en'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import 'dayjs/locale/ja'

dayjs.extend(localizedFormat)
dayjs.locale('pt-br')
dayjs.locale('en')
dayjs.locale('es')
dayjs.locale('fr')
dayjs.locale('ja')

export default dayjs
