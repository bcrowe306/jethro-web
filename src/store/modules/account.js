import { account as account_api, ID } from '@/services/appwrite'

const state = {
  account: null,
  session: null,
};

const actions = {
  signup: async ({ commit }, { email, password, name }) => {
    try {
      const new_account = await account_api.create(ID.unique(), email, password, name);
      await account_api.createEmailSession(email, password);
      commit("setAccount", new_account);
    } catch (e) {
      console.log("Error creating Account");
      commit(
        "setError",
        {
          show: true,
          message: e.message,
          color: "red",
        },
        { root: true }
      );
      throw e
    }
  },
  fetchAccount: async ({ commit }) => {
    try {
      const acc = await account_api.get();
      commit("setAccount", acc);
    } catch (e) {
      console.log("Error getting Account");
    }
  },
  login: async ({ commit }, { email, password }) => {
    try {
      await account_api.createEmailSession(email, password);
      const account = await account_api.get();
      commit("setAccount", account);
    } 
    catch (e) {
      console.log("Error creating Session", e);
      commit(
        "setError",
        {
          show: true,
          message: e.message,
          color: "red",
        },
        { root: true }
      );
      throw e
    }
  },
  logout: async ({ commit }) => {
    try {
      await account_api.deleteSession('current');
      commit("setAccount", null);
    } catch (e) {
      console.log("Error deleting session");
      commit(
        "setError",
        {
          show: true,
          message: "Failed to logout",
          color: "red",
        },
        { root: true }
      );
    }
  },
  updateName: async ({ commit } , name) => {
    try {
      var updatedAccount = await account_api.updateName(name)
      commit('setAccount', updatedAccount)

    } catch (error) {
      console.log('Error updating account name.')
      commit(
        "setError",
        {
          show: true,
          message: error.message,
          color: "red",
        },
        { root: true }
      );
    }
  },
  updateEmail: async ({ commit } , {email, password}) => {
    try {
      var updatedAccount = await account_api.updateEmail(email, password)
      commit('setAccount', updatedAccount)

    } catch (error) {
      console.log(error.message)
      commit(
        "setError",
        {
          show: true,
          message: error.message,
          color: "red",
        },
        { root: true }
      );
    }
  }
};

const getters = {
  getAccount: (state) => state.account,
  getSession: (state) => state.session,
};

const mutations = {
  setAccount: (state, account) => (state.account = account),
};

export default {
  state,
  actions,
  getters,
  mutations,
};