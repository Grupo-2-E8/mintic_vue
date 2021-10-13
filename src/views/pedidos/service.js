import http from '../../libs/axios'

const pedidosCrear = (payload) => http.post('/pedidos',payload)
const pedidosListar = () => http.get('/pedidos')
const pedidosBuscar = (id) => http.get(`/pedidos/${id}`)

export {
  pedidosCrear,
  pedidosListar,
  pedidosBuscar
}