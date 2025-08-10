import axios from 'axios'
import { BASE_URL, TIME_OUT } from '.'
import cache from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

service.interceptors.request.use(
  (config) => {
    const token = cache.getCache(LOGIN_TOKEN)
    if (config.headers && token) {
      config.headers!.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { service }
