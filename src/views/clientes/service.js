import http from '../../libs/axios'

const clienteGuardar = (payload) => http.post('/clientes',payload)
const clienteListar = () => http.get('/clientes')
const clienteDelete = (id) => http.delete(`/clientes/${id}`)

export {
  clienteGuardar,
  clienteListar,
  clienteDelete
}