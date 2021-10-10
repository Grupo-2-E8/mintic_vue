import http from '../../libs/axios'

const pedidosCrear = (payload) => http.post('/pedidos',payload)
const pedidosListar = ()=>http.get('/pedidos')

export {
  pedidosCrear,
  pedidosListar
}