import { MutationTree } from "vuex";
import { BoardState, Board } from "./states";
import { 
    REQUEST_BOARD_TO_DJANGO,
    REQUEST_BOARD_LIST_TO_DJANGO 
} from "./mutation-types";

export interface BoardMutations extends MutationTree<BoardState> {
    [REQUEST_BOARD_TO_DJANGO] (state: BoardState, receivedData: Board): void
    [REQUEST_BOARD_LIST_TO_DJANGO] (state: BoardState, receivedData: Board[]): void
}

const mutations: MutationTree<BoardState> = {
    [REQUEST_BOARD_TO_DJANGO] (state: BoardState, receivedData: Board): void {
        state.board = receivedData
    },
    [REQUEST_BOARD_LIST_TO_DJANGO] (state: BoardState, receivedData: Board[]): void {
        state.boards = receivedData
    }
}

export default mutations as BoardMutations