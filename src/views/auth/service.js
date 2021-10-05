import http from '../../libs/axios'

const loginService = ({correo,clave}) => http.post('/auth/login',{
  correo,
  clave
})


export {
  loginService
}