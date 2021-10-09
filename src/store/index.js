import { createStore } from 'vuex'
import modulesLocal from './modules'

const modules = { ...modulesLocal }

const store = createStore({
  modules
})

export function useStore () {
  return store
}

export default store
