import { getLogin } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    ESC(state) {
      state.token = null
    }
  },
  actions: {
    async LoginAction({ commit }, LoginData) {
      const res = await getLogin(LoginData)
      if (res.data.msg === '登录成功') {
        commit('SET_TOKEN', res.data)
      }
      return res.data.msg
    }
  }

}
