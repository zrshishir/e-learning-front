import api from '../../api/e-learning'
import router from '../../router'


const state = {
    token: window.localStorage.getItem('shadhin_token'),
    error: "",
    errorStatus: "",
    successStatus: "",
    responseMsg: "",
    test: ""
};

const getters = {
    isLoggedIn: (state) => {
        return !!state.token;
    },
    getMenus: (state) => {
        if(! state.token){
            return [
                {
                    title: 'Authentication', items:[
                        {icon:'face', title: 'Sign up', link: '/signup'},
                        {icon: 'lock_open', title: 'Sign in', link: '/signin'}
                    ]
                }
            ]
        }else{
            return [
                {
                    title: 'Profile', items:[
                        {icon:'face', title: 'Update Password', link: '/update-password'},
                        {icon:'', title: 'Profile2', link: ''},
                        {icon:'', title: 'Profile3', link: ''}
                    ]
                },
            ]
        }
    },
    getAuthResponse: (state) => {
        if(state.error){
            return state.responseMsg
        }
    },
    getAuthSigninResponse: (state) => {
        if(state.error){
            return state.responseMsg
        }
    },
};

const actions = {
    async login ({commit}, allLogData) {
        const response = await api.login(allLogData, 'login')
        if(response.data.error == 1){
            commit('setAuthResponse', response)
            router.push('/signin')
        }else{
            commit('setToken', response)
            window.localStorage.setItem('shadhin_token', response.data.data.users.api_token)
            router.push('/')
        }
    },

    async register ({commit},allRegData) {
       const response = await api.register(allRegData, 'signup')
        if(response.data.error){
         commit('setAuthResponse', response)
         router.push('/signup')
        }else{
            commit('setToken', response)
            window.localStorage .setItem('shadhin_token', response.data.data.users.api_token)
            router.push('/')
        }
    },

    async logout({ commit }){ // we use commit instead of mutations there are several reasons for that. there might be several request  
        commit('setToken', "")
        window.localStorage.removeItem('shadhin_token')
        router.push('/')
    },
};

const mutations = {
    setToken: (state, response) => {
        if(response == ""){
            state.token = ""
        }else{
            state.token = response.data.data.users.api_token
            state.successStatus = response.statusCode
            state.responseMsg = response.errorMsg
        }
       
    },
    setTest: (state, response) => {
        state.test = response
    },
    setAuthResponse: (state, response) => {
        state.test = response
        state.error = response.data.error
        state.errorStatus = response.data.statusCode
        state.responseMsg = response.data.errorMsg
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}