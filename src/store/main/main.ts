import { getEntireDepartments, getEntreRoles } from '@/service/main/main'
import { defineStore } from 'pinia'

interface IMainState {
  entreRoles: []
  entreDepartments: []
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
    }
  }
})
