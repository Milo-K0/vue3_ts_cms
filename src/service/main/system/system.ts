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

export function deletePageById(pageName, id) {
  return service.delete(`/${pageName}/${id}`)
}

// 适用所有页面的请求列表接口
export function postPageListData(pageName: string, queryInfo: any) {
  return service.post(`/${pageName}/list`, queryInfo)
}
