import boardModule from '@/board/store/boardModule'
import productModule from '@/product/store/productModule'
import accountModule from '@/account/store/accountModule'
import authenticationModule from "@/authentication/store/authenticationModule"

import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    boardModule,
    productModule,
    accountModule,
    authenticationModule,

  }
})
