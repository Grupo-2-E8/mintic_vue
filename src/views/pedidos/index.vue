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
        <Column header="Nombres" field="clienteId.nombres" />
        <Column header="Apellidos" field="clienteId.apellidos" sortable />
        <Column header="Estado" field="estado" />
        <Column header="Fecha" field="fecha" sortable />
        <Column header="Acciones">
          <template #body="{data}">
            <button 
            type="button" 
            class="btn btn-primary py-0"
            title="Ver"
            @click="handleView(data)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
              </svg>
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {onMounted, ref} from 'vue'
import {pedidosListar} from './service'
import { useRouter } from 'vue-router'

export default {
  name: 'PedidosPage',
  components:{
    Page,
    DataTable,
    Column
  },
  setup(){
    const pedidos = ref([])
    const router = useRouter()
    const pedidosFetch = ()=>{
      return pedidosListar().then(({data})=>{
        pedidos.value = data
      }).catch(err=>{
        console.error(err.message);
      })
    }
    const handleView = ({_id:id}) => {
      router.push({
        name: 'pedidos.ver',
        params:{ id }
      })
    }

    onMounted(()=>{
      pedidosFetch()
    })
    return {
      pedidos,
      handleView
    }
  }
}
</script>

<style>

</style>