<template>
  <Page>
    <div class="d-flex p-3">
      <router-link
      :to="{name: 'pedidos.form'}"
      class="btn btn-primary d-flex align-items-center"
      >
        <svg class="" style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M20 15V18H23V20H20V23H18V20H15V18H18V15H20M12 13C10.9 13 10 13.9 10 15S10.9 17 12 17 14 16.1 14 15 13.1 13 12 13M13.35 21H5.5C4.58 21 3.81 20.38 3.58 19.54L1.04 10.27C1 10.18 1 10.09 1 10C1 9.45 1.45 9 2 9H6.79L11.17 2.45C11.36 2.16 11.68 2 12 2S12.64 2.16 12.83 2.44L17.21 9H22C22.55 9 23 9.45 23 10L22.97 10.27L22 13.81C21.43 13.5 20.79 13.24 20.12 13.11L20.7 11H3.31L5.5 19H13C13 19.7 13.13 20.37 13.35 21M9.2 9H14.8L12 4.8L9.2 9Z" />
        </svg>
        <span> Crear nuevo pedido </span>
      </router-link>
    </div>
    <div class="">
      <DataTable :value="pedidos">
        <Column header="Identificador" field="_id" />
        <Column header="Fecha" field="fecha" sortable />
        <Column 
        header="Estado" 
        field="estado" 
        sortable
        >
          <template #body="{data}">
            {{estadoReciente(data.estados).estado}}
          </template>
        </Column>
        <Column header="Nombres" field="clienteId.nombres" sortable />
        <Column header="Apellidos" field="clienteId.apellidos" sortable />
        <Column header="Telefono" field="clienteId.telefono" sortable />
        <Column header="Correo" field="clienteId.telefono" sortable />
        <Column header="Acciones">
          <template #body="{data}">
            <button 
            type="button" 
            class="btn btn-primary p-1 m-1"
            title="Ver"
            @click="handleView(data)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
              </svg>
            </button>
            <button 
            type="button"
            class="btn btn-warning p-1 m-1"
            title="Cambiar Estado"
            @click="handleEstadoChange(data)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.04 12.13C21.18 12.13 21.31 12.19 21.42 12.3L22.7 13.58C22.92 13.79 22.92 14.14 22.7 14.35L21.7 15.35L19.65 13.3L20.65 12.3C20.76 12.19 20.9 12.13 21.04 12.13M19.07 13.88L21.12 15.93L15.06 22H13V19.94L19.07 13.88M11 19L9 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H9.18C9.6 1.84 10.7 1 12 1C13.3 1 14.4 1.84 14.82 3H19C20.1 3 21 3.9 21 5V9L19 11V5H17V7H7V5H5V19H11M12 3C11.45 3 11 3.45 11 4C11 4.55 11.45 5 12 5C12.55 5 13 4.55 13 4C13 3.45 12.55 3 12 3Z" />
              </svg>
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog 
    header="Cambiar estado" 
    :modal="true"
    v-model:visible="display" 
    >
      <form @submit="handleForm">
        <div class="row">
          <div class="col-12 mb-3">
            <label for="estado">Estado</label>
            <select 
            id="estado"
            v-model="model.estado"
            class="form-control"
            >
              <option value="Pago recibido">Pago recibido </option>
              <option value="En fabricacion">En fabricacion</option>
              <option value="En empaque">En empaque</option>
              <option value="En transportadora">En transportadora</option>
              <option value="recibido por el cliente">recibido por el cliente</option>
            </select>
            <div class="text-danger">
              {{errors.estado}}
            </div>
          </div>
          <div class="col-12 mb-3">
            <label for="justificacion">Justificacion</label>
            <textarea
            id="justificacion"
            v-model="model.justificacion"
            rows="3" 
            class="form-control" 
            />
            <div class="text-danger">
              {{errors.justificacion}}
            </div>
          </div>
          <div class="col-12 mb-3">
            <button 
            type="submit"
            class="btn btn-primary m-1"
            :disabled="esProcesando"
            >
              Guardar
            </button>
            <button 
            type="button"
            class="btn btn-outline-warning m-1"
            @click="display = !display"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </Dialog>

  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {onMounted, ref} from 'vue'
import {pedidosListar,pedidosActualizar} from './service'
import { useRouter } from 'vue-router'
import Dialog from 'primevue/dialog';
import {useField,useForm} from 'vee-validate'
import {object,string} from 'yup'
import Swal from 'sweetalert2'

export default {
  name: 'PedidosPage',
  components:{
    Page,
    DataTable,
    Column,
    Dialog
  },
  setup(){
    const router = useRouter()
    const pedidos = ref([])
    const display = ref(false)
    const pedidoSel = ref({})
    const esProcesando = ref(false)

    const pedidosFetch = ()=>{
      return pedidosListar().then(({data})=>{
        pedidos.value = data
      }).catch(err=>{
        console.error(err.message);
      })
    }
    
    const handleView = ({_id:id}) => {
      const pathRoute = router.resolve({ name: 'pedidos.ver', params:{ id } })
      console.log(pathRoute);
      window.open(pathRoute.fullPath,'_blank')
    }

    const handleEstadoChange = (value) => {
      display.value = !display.value
      pedidoSel.value = {...value}
    }
    
    const validationSchema = object({
      estado: string().required(),
      justificacion: string().required()
    })

    const {
      values: model,
      handleSubmit,
      errors
    } = useForm({
      validationSchema
    })

    useField('estado',null,{initialValue: ''})
    useField('justificacion',null,{initialValue: ''})

    const handleForm = handleSubmit((values)=>{
      esProcesando.value = true
      const {_id:id} = pedidoSel.value
      pedidosActualizar(id,values).then(({data})=>{
        display.value = false
        esProcesando.value = false
        Swal.fire('Mensaje','Estado agregado','success')
      }).catch(err=>{
        console.error(err.message)
        esProcesando.value = false
      })
    })

    const estadoReciente = (values = []) => {
      return values.pop()
    }

    onMounted(()=>{
      pedidosFetch()
    })

    return {
      errors,
      model,
      pedidoSel,
      display,
      pedidos,
      esProcesando,
      estadoReciente,
      handleView,
      handleEstadoChange,
      handleForm
    }
  }
}
</script>

<style>

</style>