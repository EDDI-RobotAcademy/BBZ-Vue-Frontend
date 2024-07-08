import { createStore } from 'vuex'

import boardModule from '@/board/store/boardModule'
import productModule from '@/product/store/productModule'
import accountModule from '@/account/store/accountModule'
import authenticationModule from "@/authentication/store/authenticationModule"
import favoritesModule from '@/favorites/store/favoritesModule'
import surveyModule from '@/survey/store/surveyModule'
import orderModule from '@/order/store/orderModule'
import marketingModule from '@/marketing/store/marketingModule'

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
    favoritesModule,
    surveyModule,
    orderModule,
    marketingModule,
  }
})
