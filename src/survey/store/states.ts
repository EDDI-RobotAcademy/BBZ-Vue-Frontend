export interface SurveyState {
    survey: Survey | null
}

export interface Survey {
    productId: number
    numOfAdult: number
    numOfChild: number
    haveBreakfast: number
    isExistCar: number
    lenOfReservation: number
}

const state: SurveyState = {
    survey: null
}

export default state