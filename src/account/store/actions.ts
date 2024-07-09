import { ActionContext, mapState } from "vuex"
import { AccountState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"


export type AccountActions = {
    requestEmailDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        email: string
    ): Promise<boolean>
    requestNicknameDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        payload: any
    ): Promise<boolean>
    requestCreateNewAccountToDjango(
        context: ActionContext<any, any>,
        accountInfo: { email: string, nickname: string }
    ): Promise<void>
    requestGetNicknameToDjango(
        context: ActionContext<AccountState, any>
    ): Promise<AxiosResponse>
    requestAdminLoginToDjango(
        context: ActionContext<any, any>,
        loginData: {
            email: string,
            password: string
        }
    ): Promise<boolean>
}

const actions: AccountActions = {
    async requestEmailDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        email: string
    ): Promise<boolean> {

        const response = await axiosInst.djangoAxiosInst.post(
                '/account/email-duplication-check', { email })
        return response.data.isDuplicate
    },
    async requestNicknameDuplicationCheckToDjango(
        context: ActionContext<AccountState, any>,
        payload: any
    ): Promise<boolean> {

        const { newNickname } = payload

        return axiosInst.djangoAxiosInst.post(
                    '/account/nickname-duplication-check', 
                    { newNickname: newNickname }
        )
        .then((res) => {
            if (res.data) {
                alert('사용 가능한 닉네임입니다!')
                return false
            } else {
                alert('중복된 닉네임입니다!')
                return true
            }
        })
    },
    async requestCreateNewAccountToDjango(
        context: ActionContext<any, any>,
        accountInfo: { email: string, nickname: string }
    ): Promise<void> {

        try {
            await axiosInst.djangoAxiosInst.post('/account/register', accountInfo)
        } catch (error) {
            console.error('신규 계정 생성 실패:', error)
            throw error
        }
    },
    async requestGetNicknameToDjango(
        context: ActionContext<AccountState, any>
    ): Promise<AxiosResponse> {
        try {
            const userToken = localStorage.getItem('userToken')
            if (!userToken) {
                throw new Error('User token not found!')
            }

            const requestData = {
                userToken
            }

            const response = await axiosInst.djangoAxiosInst.post('/account/get-nickname', requestData)
            console.log('requestGetNicknameToDjango() response:', response.data)
            return response.data
        } catch (error) {
            console.error('requestGetNicknameToDjango() 중 에러 발생:', error)
            throw error
        }
    },
    async requestAdminLoginToDjango(
        context: ActionContext<any, any>,
        loginData: {
            email: string,
            password: string
        }
    ): Promise<boolean> {

        try {
            const response = await axiosInst.djangoAxiosInst.post('/account/admin', loginData)
            console.log("requestAdminLoginToDjango response:", response.data)
            return response.data
        } catch (error) {
            console.error("requestAdminLoginToDjango() 중 에러 발생:", error)
            throw error
        }
    }
};

export default actions;