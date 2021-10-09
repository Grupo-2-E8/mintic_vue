import Cookies from 'js-cookie'
import axios from '../../libs/axios'
const state = {
  user: null,
  token: Cookies.get('token')
}
const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

const mutations = {
  SAVE_TOKEN(state, { token, remember }){
    state.token = token
    Cookies.set('token', token, { expires: remember ? 365 : null })
  },
  LOGOUT(state){
    state.user = null
    state.token = null
    Cookies.remove('token')
  },
}

const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },
  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get('/me')
      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },
  async logout ({ commit }) {
    try {
      await axios.post('/logout')
    } catch (e) { }
    commit(types.LOGOUT)
  },
}

export default {
  namespace: 'auth',
  state,
  getters,
  mutations,
  actions
}