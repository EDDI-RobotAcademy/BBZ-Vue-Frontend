import actions, { AuthenticationActions } from "./actions"
import state, { AuthenticationState } from "./states"

export interface AuthenticationModule {
    namespaced: true
    state: AuthenticationState
    actions: AuthenticationActions
}

const authenticationModule: AuthenticationModule = {
    namespaced: true,
    state,
    actions,
}

export default authenticationModule