import { defineStore } from 'pinia'
import { accountLoginRequest } from '@/service/login/login'
import type { IAccount } from '@/types'
import cache from '@/utils/cache'

const LOGIN_TOKEN = 'login/token'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    name: '',
    token: cache.getCache(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      let loginResult = await accountLoginRequest(account)
      loginResult = loginResult.data
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token
      cache.setCache(LOGIN_TOKEN, loginResult.data.token)
    }
  }
})

export { useLoginStore }
