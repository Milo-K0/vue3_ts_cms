import { service } from '@/service/myAxios'

export function getEntreRoles() {
  return service.post('/role/list')
}

export function getEntireDepartments() {
  return service.post('/department/list')
}

export function postNewUserData(formData: any) {
  return service.post('/users', formData)
}

export function patchChangeUser(id: number, formData: any) {
  return service.patch(`/users/${id}`, formData)
}

export function postNewPageData(pageName, formData) {
  return service.post(`/${pageName}`, formData)
}

export function patchChangePage(pageName, id, formData) {
  return service.patch(`/${pageName}/${id}`, formData)
}
