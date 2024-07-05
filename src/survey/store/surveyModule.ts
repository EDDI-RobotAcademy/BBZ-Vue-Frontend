import actions, { SurveyActions } from './actions'
// import mutations, { SurveyMutations } from './mutations'
import state, { SurveyState } from  './states'

export interface SurveyModule {
    namespaced: true
    state: SurveyState
    actions: SurveyActions
    // mutations: SurveyMutations
}

const surveyModule: SurveyModule = {
    namespaced: true,
    state,
    actions,
    // mutations,
}

export default surveyModule
