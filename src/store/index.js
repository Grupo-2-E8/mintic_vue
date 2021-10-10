import { createStore } from 'vuex'
import modulesLocal from './modules'

const store = createStore({
  modules:{
    ...modulesLocal
  }
})

export function useStore () {
  return store
}

export default store
