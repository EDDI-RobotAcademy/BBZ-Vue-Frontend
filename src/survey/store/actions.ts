import { ActionContext } from "vuex";
import { Survey, SurveyState } from "./states";
import { AxiosResponse } from "axios";
import axiosInst from "@/utility/axiosInstance"

export type SurveyActions = {
    requestCreateSurveyToDjango(context: ActionContext<SurveyState, unknown>, 
        payload: { productId: number, numOfAdult: number, numOfChild: number, haveBreakfast: number, isExistCar: number, lenOfReservation: number }
    ): Promise<AxiosResponse>
}

const actions: SurveyActions = {
    async requestCreateSurveyToDjango(context: ActionContext<SurveyState, unknown>, 
        payload: { productId: number, numOfAdult: number, numOfChild: number, haveBreakfast: number, isExistCar: number, lenOfReservation: number }
    ): Promise<AxiosResponse> {
        try {
            
            const { productId, numOfAdult, numOfChild, haveBreakfast, isExistCar, lenOfReservation } = payload
            const surveyData = { productId, numOfAdult, numOfChild, haveBreakfast, isExistCar, lenOfReservation }
            console.log('requestCreateSurveyToDjango()')
            console.log('surveyData:', surveyData)
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                '/survey/register', surveyData
            )
            console.log('응답 데이터:', res.data)
            return res
        } catch (error) {
            console.error('requestCreateSurveyToDjango():', error)
            throw error
        }
    }
}

export default actions