export interface AuthenticationState {
    isAuthenticated: boolean
    isAdmin: boolean
}

const state: AuthenticationState = {
    isAuthenticated: false,
    isAdmin: false
}

export default state