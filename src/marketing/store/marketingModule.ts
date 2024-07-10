import actions, { MarketingActions } from "./actions"
import state, { MarketingState } from "./states"
import mutations, { MarketingMutations } from "./mutations"

export interface MarketingModule {
    namespaced: true
    state: MarketingState
    actions: MarketingActions
    mutations: MarketingMutations
}

const marketingModule: MarketingModule = {
    namespaced: true,
    state,
    actions,
    mutations,
}

export default marketingModule