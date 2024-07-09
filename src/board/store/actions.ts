import { ActionContext } from "vuex"
import { Board, BoardState } from "./states"
import { AxiosResponse } from "axios"
import axiosInst from "@/utility/axiosInstance"
import { REQUEST_BOARD_LIST_TO_DJANGO } from "./mutation-types"

export type BoardActions = {
    requestBoardToDjango(context: ActionContext<BoardState, any>, boardId: number): Promise<void>
    requestBoardListToDjango(context: ActionContext<BoardState, any>): Promise<void>
    requestCreateBoardToDjango(context: ActionContext<BoardState, unknown>, payload: {
        title: string, writer: string, content: string
    }): Promise<AxiosResponse>
    requestDeleteBoardToDjango(context: ActionContext<BoardState, unknown>, boardId: number): Promise<void>
    requestModifyBoardToDjango(context: ActionContext<BoardState, any>, payload: {
        title: string, content: string, boardId: number
    }): Promise<void>
}

const actions: BoardActions = {
    async requestBoardListToDjango(context: ActionContext<BoardState, any>): Promise<void> {
        try {
            const res: AxiosResponse<any, any> = 
                await axiosInst.djangoAxiosInst.get('/board/list')
            const data: Board[] = res.data
            context.commit('REQUEST_BOARD_LIST_TO_DJANGO', data)

        } catch (error) {
            console.error('requestBoardListToDjango(): ' + error)
            throw error
        }
    },
    async requestBoardToDjango(context: ActionContext<BoardState, any>, boardId: number): Promise<void> {
        try {
            const res: AxiosResponse<Board> = await axiosInst.djangoAxiosInst.get(`/board/read/${boardId}`);
            console.log('data:', res.data)
            context.commit('REQUEST_BOARD_TO_DJANGO', res.data);
        } catch (error) {
            console.error('requestBoardToDjango() 문제 발생:', error);
            throw error
        }
    },
    async requestCreateBoardToDjango(context: ActionContext<BoardState, unknown>, payload: {
        title: string, writer: string, content: string
    }): Promise<AxiosResponse> {
        console.log('requestCreateBoardToDjango()')

        const { title, writer, content } = payload

        try {
            const res: AxiosResponse = await axiosInst.djangoAxiosInst.post(
                'board/register', { title, writer, content })
            return res.data
        } catch (error) {
            alert('requestCreateBoardToDjango() 문제 발생!')
            throw error
        }
    },
    async requestDeleteBoardToDjango(context: ActionContext<BoardState, unknown>, boardId: number): Promise<void>
    {

        try {
            await axiosInst.djangoAxiosInst.delete(`/board/delete/${boardId}`)
        } catch (error) {
            console.log('requestDeleteBoardToDjango() 과정에서 문제 발생')
            throw error
        }
    },
    async requestModifyBoardToDjango(context: ActionContext<BoardState, any>, payload: {
        title: string, content: string, boardId: number
    }): Promise<void> {

        const { title, content, boardId } = payload

        try {
            await axiosInst.djangoAxiosInst.put(`/board/modify/${boardId}`, {title, content})
            console.log('수정 성공!')
        } catch (error) {
            console.log(' requestModifyBoardToDjango() 과정에서 문제 발생')
            throw error
        }
    }
};

export default actions;