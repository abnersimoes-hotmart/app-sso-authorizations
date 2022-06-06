import axios from 'axios'
import { onResponse } from '.'

const baseURL = process.env.API_SSO
const ssoApi = axios.create({ baseURL })

ssoApi.interceptors.response.use(onResponse, () => null)

export default ssoApi
