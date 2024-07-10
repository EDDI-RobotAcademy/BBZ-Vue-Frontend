import { MutationTree } from "vuex";
import { MarketingState, Aarrr } from "./states";
import { 
    REQUEST_MARKETING_LIST_TO_DJANGO 
} from "./mutation-types";

export interface MarketingMutations extends MutationTree<MarketingState> {
    [REQUEST_MARKETING_LIST_TO_DJANGO] (state: MarketingState, receivedData: Aarrr): void
}

const mutations: MutationTree<MarketingState> = {
    [REQUEST_MARKETING_LIST_TO_DJANGO] (state: MarketingState, receivedData: Aarrr): void {
        state.aarrr = receivedData
    },
}

export default mutations as MarketingMutations