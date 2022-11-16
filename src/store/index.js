import { createStore } from 'vuex';
import account from './modules/account'
const state = {
    error: {}
}

const mutations = {
    setError: (state, error) => state.error = error
}

const getters = {
    getError: (state) => state.error
}

const actions = {}

const store = createStore({
    state,
    getters,
    actions,
    mutations,
    modules: {
        account
    }
})

export default store