import {
  getEntireDepartments,
  getEntreRoles,
  patchChangePage,
  patchChangeUser,
  postNewPageData,
  postNewUserData
} from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entreRoles: IRole[]
  entreDepartments: IDepartment[]
}

// 定义角色数据的接口
interface IRole {
  id: number // 假设id是数字类型，根据实际接口调整
  name: string // 假设角色名称
  // 其他角色相关属性，根据实际接口返回的字段添加
}

// 定义部门数据的接口
interface IDepartment {
  id: number // 假设id是数字类型，根据实际接口调整
  name: string // 假设部门名称
  // 其他部门相关属性，根据实际接口返回的字段添加
}

export const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entreRoles: [],
    entreDepartments: []
  }),
  actions: {
    async getMainDataActions() {
      const roles = await getEntreRoles()
      const departments = await getEntireDepartments()
      this.entreRoles = roles.data.list
      this.entreDepartments = departments.data.list
    },
    async postNewUserDataActions(formData: any) {
      const newUserResult = postNewUserData(formData)
      return newUserResult
    },
    async patchChangeUserDataActions(id: number, formData: any) {
      const changeUserResult = patchChangeUser(id, formData)
      return changeUserResult
    },
    async postNewPageDataActions(pageName, formData) {
      const newPageResult = postNewPageData(pageName, formData)
      return newPageResult
    },
    async patchChangePageDataActions(
      pageName: string,
      id: number,
      formData: any
    ) {
      patchChangePage(pageName, id, formData)
    }
  }
})
