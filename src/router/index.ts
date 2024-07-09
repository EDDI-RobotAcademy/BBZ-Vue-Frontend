import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import HomeRoutes from '@/home/router/HomeRoutes'
import BoardRoutes from '@/board/router/BoardRoutes'
import ProductRoutes from '@/product/router/ProductRoutes'
import AccountRoutes from '@/account/router/AccountRoutes'
import AuthenticationRoutes from '@/authentication/router/AuthenticationRoutes'
import FavoritesRoutes from '@/favorites/router/FavoritesRoutes'
import SurveyRoutes from '@/survey/router/SurveyRoutes'
import OrderRoutes from '@/order/router/OrderRoutes'
import PotripsRoutes from '@/sponsors/router/PotripsRoutes'
import ReservationAnalysisRoutes from '@/reservationAnalysis/router/ReservationAnalysisRoutes'
import CustomerChurnAnalysisRoutes from '@/customerChurnAnalysis/router/customerChurnAnalysisRoutes'


const routes: Array<RouteRecordRaw> = [
  ...HomeRoutes,
  ...BoardRoutes,
  ...ProductRoutes,
  ...AccountRoutes,
  ...AuthenticationRoutes,
  ...FavoritesRoutes,
  ...SurveyRoutes,
  ...OrderRoutes,
  ...PotripsRoutes,
  ...ReservationAnalysisRoutes,
  ...CustomerChurnAnalysisRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
