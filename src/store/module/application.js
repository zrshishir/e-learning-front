import api from '../../api/e-learning'
import router from '../../router';

const state = {
    error: '',
    statusCode:'',
    errorMsg: '',
    indexData: [],
    investorAgreement: '',
    investeeAgreement: '',
    docImage: '',
    userImage: '',
    test: ''
}

const getters = {
    error: (state) =>{
        return state.error
    },
    statusCode: (state) => {
        return state.statusCode
    },
    errorMsg: (state) => {
        return state.errorMsg
    },
    investeeAgreement: (state) => {
        return state.investeeAgreement
    },
    investorAgreement: (state) => {
        return state.investorAgreement
    },
    userImage: (state) => {
        return state.userImage
    },
    docImage: (state) => {
        return state.docImage
    },
    indexData: (state) => {
        return state.indexData
    },
}

const actions = {
    async indexData({rootState, commit}, parameters){
        const{ token } = rootState.auth
        const response = await api.fetchAllData(token, parameters[0],parameters[1])
        commit('setData', response)
    },

    async setIndexData({rootState, commit}, parameters){
        const{ token } = rootState.auth
        const response = await api.fetchData(token, parameters[0])
        commit('setResponse', response)
    },

    async store({rootState, commit},parameters){
        const { token } = rootState.auth
        const response = await api.storeData(token, parameters[0], parameters[1])
        commit('setResponse', response)
        // router.push('/task')
    },
    async update({rootState, commit}, updateData){
        const { token } = rootState.auth
        const response = await api.updateData(token, updateData.id, updateData, 'task')
        commit('setData', response)
        router.push('/task')
    },
    async delete({rootState, commit}, parameters){
        const { token } = rootState.auth
        const response = await api.deleteData(token, parameters[0], parameters[1])
        commit('setResponse', response)
    },
    async changeStatus({rootState, commit}, parameters){
        const { token } = rootState.auth
        const response = await api.changeDataStatus(token, parameters[0], parameters[1])
        commit('setData', response)
    },
    
    setErrorZero({commit}){
        commit('setErrorToZero')
    }
    
}

const mutations = {
    setData: (state, responseData) => {
        // state.test = responseData
        if(responseData.data.error == 1){
            state.statusCode = responseData.data.statusCode
            state.error = responseData.data.error
            state.errorMsg = responseData.data.errorMsg
        }else{
            state.error = responseData.data.error
            state.statusCode = responseData.data.statusCode
            state.errorMsg = responseData.data.errorMsg
            state.indexData = responseData.data.data.pendingDetails
            state.investorAgreement = responseData.data.data.investorAgreement
            state.investeeAgreement = responseData.data.data.investeeAgreement
            state.userImage = responseData.data.data.userImage
            state.docImage = responseData.data.data.docImage
        }
    },
    setResponse: (state, responseData) => {
        // state.test = responseData
        if(responseData.data.error == 1){
            state.statusCode = responseData.data.statusCode
            state.error = responseData.data.error
            state.errorMsg = responseData.data.errorMsg
        }else{
            state.error = responseData.data.error
            state.statusCode = responseData.data.statusCode
            state.errorMsg = responseData.data.errorMsg
            state.indexData = responseData.data.data
        }
    },
    setErrorToZero: (state) => {
        state.error = 0
    },
    setTest: (state, credentials) => {
        state.test = credentials[0] + '/' + credentials[1] + credentials[2]
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}