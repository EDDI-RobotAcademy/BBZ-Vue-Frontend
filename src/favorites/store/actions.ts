import { ActionContext } from "vuex";
import { FavoritesItem, FavoritesState } from "./states"
import { AxiosResponse } from 'axios'
import axiosInst from "@/utility/axiosInstance"

export type FavoritesActions = {
    requestAddFavoritesToDjango(
        context: ActionContext<FavoritesState, any>,
        favoritesData: FavoritesItem
    ): Promise<AxiosResponse>
    requestFavoritesListToDjango(
        context: ActionContext<FavoritesState, any>
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
    async requestFavoritesListToDjango({ commit }): Promise<AxiosResponse> {
        try {
            const userToken = localStorage.getItem('userToken')
            if (!userToken) {
                throw new Error('User token not found!')
            }

            const requestData = {
                userToken
            }

            console.log('requestFavoritesListToDjango() requestData:', requestData)

            const response = await axiosInst.djangoAxiosInst.post('favorites/list', requestData)
            return response.data
        } catch (error) {
            console.error('Error fetching favorites list:', error)
            throw error
        }
    }
}

export default actions