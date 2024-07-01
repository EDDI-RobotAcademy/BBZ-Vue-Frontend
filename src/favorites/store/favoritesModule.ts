import actions, { FavoritesActions } from "./actions"
import state, { FavoritesState } from "./states"

export interface FavoritesModule {
    namespaced: true
    state: FavoritesState
    actions: FavoritesActions
}

const favoritesModule: FavoritesModule = {
    namespaced: true,
    state,
    actions,
}

export default favoritesModule