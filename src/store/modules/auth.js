import Cookies from 'js-cookie'
import axios from '../../libs/axios'

const state = () => ({
  user: null,
  token: Cookies.get('token')
})

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
  FETCH_USER_SUCCESS(state, { user }) {
    state.user = user
  },
  FETCH_USER_FAILURE(state) {
    state.token = null
    Cookies.remove('token')
  },
}

const actions = {
  saveToken ({ commit, dispatch }, payload) {
    console.log(111,payload);
    commit(`SAVE_TOKEN`, payload)
  },
  async fetchUser({ commit }) {
    try {
      const { data } = await axios.get('/auth/me')
      commit(`FETCH_USER_SUCCESS`, { user: data })
    } catch (e) {
      commit(`FETCH_USER_FAILURE`)
    }
  },
  async logout ({ commit }) {
    try {
      await axios.post('/auth/logout')
    } catch (e) { }
    commit(`LOGOUT`)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}