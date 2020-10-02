import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

export default new Vuex.Store( {
    state: {
        profile: {
            isAuthenticated: false
        }
    },
    mutations: {
        setUserAuthentication(state, isAuthenticated) {
            state.profile.isAuthenticated = isAuthenticated;
        }
    },
    getters: {
        getProfile(state) {
            return state.profile;
        }
    }
})