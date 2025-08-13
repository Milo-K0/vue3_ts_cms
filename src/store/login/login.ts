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
import { mapManusToRoutes } from '@/utils/map-manus'
import { useMainStore } from '../main/main'

interface ILoginInfo {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginInfo => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 账号登录 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      const token = loginResult.data.token
      this.token = token
      // 先缓存token，下面获取详情信息需要用到token
      cache.setCache(LOGIN_TOKEN, this.token)
      // 2. 获取登录用户的详情信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo
      // 3. 根据id获取用户权限所获取的列表
      const userMenuResult = await getMenuInfoById(this.userInfo.role.id)
      const userMenus = userMenuResult.data
      this.userMenus = userMenus
      // 4. 进行本地缓存
      cache.setCache('userInfo', this.userInfo)
      cache.setCache('userMenus', this.userMenus)

      // 动态添加路由
      const routes = mapManusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // . 进行页面跳转(main页面)
      router.push({
        path: '/main/analysis/overview'
      })
    },
    loadLocalCacheAction() {
      const token = cache.getCache(LOGIN_TOKEN)
      const userInfo = cache.getCache('userInfo')
      const userMenus = cache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
      }
      // 请求数据
      const mainStore = useMainStore()
      mainStore.getMainDataActions()
      // 动态添加路由
      const routes = mapManusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
    }
  }
})

export { useLoginStore }
