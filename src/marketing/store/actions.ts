import axios, { AxiosResponse } from "axios"
import { ActionContext } from "vuex"
import { Aarrr, LogData, MarketingState } from "./states"
import axiosInst from "@/utility/axiosInstance"


export type MarketingActions = {
    requestCreateLogToDjango(
        context: ActionContext<MarketingState, unknown>,
        logData: LogData
    ): Promise<AxiosResponse>
    requestMarketingListToDjango(
        context: ActionContext<MarketingState, any>
    ): Promise<void>
}

const actions: MarketingActions = {
    async requestCreateLogToDjango(
        context: ActionContext<MarketingState, unknown>,
        logData: LogData
    ): Promise<AxiosResponse> {

        try {
            const response: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                'account/log', logData)
            return response.data
        } catch (error) {
            alert('requestCreateLogToDjango() 문제 발생!')
            throw error
        }
    },
    async requestMarketingListToDjango(
        context: ActionContext<MarketingState, any>
    ): Promise<void> {
        try {
            const response: AxiosResponse<any, any> = await axiosInst.djangoAxiosInst.get('/marketing/list')
            const data: Aarrr = response.data
            console.log("AARRR response:", data)
            context.commit('REQUEST_MARKETING_LIST_TO_DJANGO', data)
        } catch (error) {
            alert('requestMarketingListToDjango() 문제 발생!')
            console.error('Error fetching marketing list:', error)
            throw error
        }
    },
}

export default actions