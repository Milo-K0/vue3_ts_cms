import {
  deletePageById,
  deleteUsersById,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
// 用户相关仓库

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListActions(info) {
      const usersListResult = await postUsersListData(info)
      this.usersList = usersListResult.data.list
      this.usersTotalCount = usersListResult.data.totalCount
    },
    async deleteUsersByIdActions(id: number) {
      deleteUsersById(id)
      this.postUsersListActions({ offset: 0, size: 10 })
    },
    async postPageListActions(pageName, queryInfo) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      console.log(pageListResult)
      this.pageList = pageListResult.data.list
      this.pageTotalCount = pageListResult.data.totalCount
    },
    async deletePageByIdActions(pageName: string, id: number) {
      const pageDeleteResult = await deletePageById(pageName, id)
      this.postPageListActions(pageName, { offset: 0, size: 10 })
      return pageDeleteResult
    }
  }
})

export { useSystemStore }
