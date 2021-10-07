import http from '../../libs/axios'

const loginService = ({correo,clave}) => http.post('/auth/login',{
  correo,
  clave
})

const registerService = ({correo,clave}) => http.post('/usuarios',{
  correo,
  clave
})



export {
  loginService,
  registerService
}