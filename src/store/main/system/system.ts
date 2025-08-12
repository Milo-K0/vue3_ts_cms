import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
// 用户相关仓库

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0
  }),
  actions: {
    async postUsersListRequest() {
      const usersListResult = await postUsersListData()
      this.usersList = usersListResult.data.list
      this.usersTotalCount = usersListResult.data.totalCount
      console.log(usersListResult)
    }
  }
})

export { useSystemStore }
