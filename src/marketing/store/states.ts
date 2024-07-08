export interface MarketingState {
    logData: LogData[]
}

export interface LogData {
    userToken: string
    actionType: string
    actionTime: string
}

const state: MarketingState = {
    logData: []
}

export default state