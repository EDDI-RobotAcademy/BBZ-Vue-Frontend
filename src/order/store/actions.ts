import { ActionContext } from "vuex"
import { OrderItem, OrderState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"

export type OrderActions = {
    requestCreateOrdersToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            userToken: string,
            productId: number
        }
    ): Promise<AxiosResponse>;

    requestReadOrdersToDjango(
        context: ActionContext<OrderState, any>,
        payload: {
            ordersId: number
        }
    ): Promise<AxiosResponse>
}

const actions: OrderActions = {
    async requestCreateOrdersToDjango({ state }, payload) {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) {
                throw new Error('User token not found');
            }

            console.log('payload:', payload)
            const productId = payload.productId
            const requestData = {
                userToken,
                productId
            };

            const response =
                await axiosInst.djangoAxiosInst.post('/orders/create', requestData);
            console.log('response data:', response.data)

            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    async requestReadOrdersToDjango({ state }, payload) {
        try {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) {
                throw new Error('User token not found');
            }

            const { ordersId } = payload

            const requestData = {
                userToken,
            }

            const response =
                await axiosInst.djangoAxiosInst.post(`/orders/read/${ordersId}`, requestData)
            console.log('data:', response.data)

            return response.data
        } catch (error) {
            console.error('주문 내역 요청 중 에러:', error)
            throw error
        }
    }
};

export default actions;