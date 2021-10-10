import http from '../../libs/axios'

const clienteGuardar = (payload) => http.post('/clientes',payload)

export {
  clienteGuardar
}