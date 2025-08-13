import { service } from '@/service/myAxios'

// 用户相关的网络请求
export function postUsersListData(info: any) {
  return service.post('/users/list', {
    offset: info.offset,
    size: info.size,
    name: info.name,
    cellphone: info.cellphone
  })
}

export function deleteUsersById(id: number) {
  return service.delete(`/users/${id}`)
}
