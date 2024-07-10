export interface MarketingState {
    logData: LogData[]
    aarrr: Aarrr | null
}

export interface LogData {
    userToken: string
    actionType: string
    actionTime: string
}

export interface Aarrr {
    acquisition: number
    activation: number
    revenue: number
    retention: number
    referral: number
}

const state: MarketingState = {
    logData: [],
    aarrr: null
}

export default state