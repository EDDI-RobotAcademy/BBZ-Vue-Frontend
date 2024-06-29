import { ActionContext } from "vuex";
import { FavoritesItem, FavoritesState } from "./states"
import { AxiosResponse } from 'axios'
import axiosInst from "@/utility/axiosInstance"

export type FavoritesActions = {
    requestAddFavoritesToDjango(
        context: ActionContext<FavoritesState, any>,
        favoritesData: FavoritesItem
    ): Promise<AxiosResponse>
}

const actions: FavoritesActions = {
    async requestAddFavoritesToDjango({ commit }, favoritesData: FavoritesItem): Promise<AxiosResponse> {
        
        try {
            const userToken = localStorage.getItem('userToken')
            if (!userToken) {
                throw new Error('User token not found')
            }

            const requestData = {
                ...favoritesData,
                userToken
            }

            console.log('favoritesData:', favoritesData)

            const response = await axiosInst.djangoAxiosInst.post('/favorites/register', requestData)
            return response.data
        } catch (error) {
            console.error('Error adding to favorites', error)
            throw error
        }
    },
}

export default actions