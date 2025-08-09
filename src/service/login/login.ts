import { service } from '../myAxios'
import type { IAccount } from '@/types'

export function accountLoginRequest(account: IAccount) {
  return service.post('/login', account)
}
