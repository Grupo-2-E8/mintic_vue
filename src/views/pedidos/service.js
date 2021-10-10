import http from '../../libs/axios'

const pedidosCrear = (payload) => http.post('/pedidos',payload)

export {
  pedidosCrear
}