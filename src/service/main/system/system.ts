import { service } from '@/service/myAxios'

// 用户相关的网络请求
export function postUsersListData() {
  return service.post('/users/list', { offset: 0, size: 10 })
}
