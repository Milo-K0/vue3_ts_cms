// import cache from '@/utils/cache'
import { service } from '../myAxios'
import type { IAccount } from '@/types'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return service.post('/login', account)
}

export function getUserInfoById(id: number) {
  return service.get(`/users/${id}`, {
    // headers: {
    //   Authorization: 'Bearer' + cache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getMenuInfoById(id: number) {
  return service.get(`/role/${id}/menu`)
}
