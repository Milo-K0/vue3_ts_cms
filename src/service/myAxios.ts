import axios from 'axios'
import { BASE_URL, TIME_OUT } from '.'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

service.interceptors.request.use(
  (config) => {
    console.log('成功进行请求拦截')
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    console.log('成功进行相应拦截')
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)
