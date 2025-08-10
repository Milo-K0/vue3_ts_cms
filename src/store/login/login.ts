import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getMenuInfoById,
  getUserInfoById
} from '@/service/login/login'
import type { IAccount } from '@/types'
import cache from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginInfo {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginInfo => ({
    token: cache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: cache.getCache('userInfo') ?? {},
    userMenus: cache.getCache('userMenus') ?? []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 账号登录 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      // 先缓存token，下面获取详情信息需要用到token
      cache.setCache(LOGIN_TOKEN, this.token)
      // 2. 获取登录用户的详情信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data
      // 3. 根据id获取用户权限所获取的列表
      const userMenuResult = await getMenuInfoById(this.userInfo.role.id)
      this.userMenus = userMenuResult.data
      // 4. 进行本地缓存
      cache.setCache('userInfo', this.userInfo)
      cache.setCache('userMenus', this.userMenus)
      // . 进行页面跳转(main页面)
      router.push({
        path: '/main'
      })
    }
  }
})

export { useLoginStore }
