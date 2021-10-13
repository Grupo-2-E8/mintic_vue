<template>
  <Page>
    <div class="d-flex p-3">
      <router-link
      :to="{name: 'pedidos.form'}"
      class="btn btn-primary"
      >
        Crear nuevo pedido
      </router-link>
    </div>
    <div class="">
      <DataTable :value="pedidos">
        <Column header="ID" field="_id" />
        <Column header="Cliente" field="clienteId" />
        <Column header="Estado" field="estado" />
        <Column header="Fecha" field="fecha" />
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