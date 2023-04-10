import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: false,
    tableData: null,
  },
  getters: {
    getTableData(state) {
      return state.tableData;
    }
  },
  mutations: {
    SET_AUTH: (state: {authenticated: boolean}, auth:boolean) => state.authenticated = auth,
    setTableData(state, data) {
      state.tableData = data;
    }
  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('SET_AUTH', auth),
    
  },
  modules: {
  }
})
