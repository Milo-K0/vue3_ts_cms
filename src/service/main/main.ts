import { service } from '@/service/myAxios'

export function getEntreRoles() {
  return service.post('/role/list')
}

export function getEntireDepartments() {
  return service.post('/department/list')
}
