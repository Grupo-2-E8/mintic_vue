import axios from 'axios'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import app from '../config/app.config'
import store from '../store'

axios.defaults.baseURL = `${app.api}/api`

axios.interceptors.request.use(config=>{
  const token = Cookies.get('token')
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axios.interceptors.response.use(response => response,error=>{
  const { status } = error
  if(status === 401 &&  store.getters['auth/check']){
    Swal.fire('Advertencia','Esta sesion a expirado','warning').then(()=>{
      store.commit('auth/LOGOUT')
      router.push({ name: 'auth.login' })
    })
  } 
  
  if (status >= 500) {
    Swal.fire('Mensaje','Ha sucedido un error','error')
  }

  return Promise.reject(error)
})

export default axios