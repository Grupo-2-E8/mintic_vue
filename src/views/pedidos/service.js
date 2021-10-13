import http from '../../libs/axios'

const pedidosCrear = (payload) => http.post('/pedidos',payload)
const pedidosListar = () => http.get('/pedidos')
const pedidosBuscar = (id) => http.get(`/pedidos/${id}`)
const pedidosActualizar = (id,payload) => http.put(`/pedidos/${id}`,payload)

export {
  pedidosCrear,
  pedidosListar,
  pedidosBuscar,
  pedidosActualizar
}