import axios from 'axios'
import { BASE_URL, TIME_OUT } from '.'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { service }
