import axios, { AxiosResponse } from "axios"
import { ActionContext } from "vuex"
import { LogData, MarketingState } from "./states"
import axiosInst from "@/utility/axiosInstance"


export type MarketingActions = {
    requestCreateLogToDjango(
        context: ActionContext<MarketingState, unknown>,
        logData: LogData
    ): Promise<AxiosResponse>
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
}

export default actions