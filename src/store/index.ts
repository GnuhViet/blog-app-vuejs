import { Commit, createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: false,
    tableData: null,
    categoryId: null,
  },
  getters: {
    getTableData(state) {
      return state.tableData;
    },
    getCategoryId(state){
      return state.categoryId;
    }
  },
  mutations: {
    SET_AUTH: (state: {authenticated: boolean}, auth:boolean) => state.authenticated = auth,
    setTableData(state, data) {
      state.tableData = data;
    },
    setCategoryId(state,data){
      state.categoryId = data;
    }
  },
  actions: {
    setAuth: ({commit}: {commit: Commit}, auth: boolean) => commit('SET_AUTH', auth),
    
  },
  modules: {
  }
})
