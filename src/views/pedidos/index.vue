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
            class="btn btn-primary py-0 px-0"
            title="Ver"
            @click="handleView(data)"
            >
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M17 18C17.6 18 18 18.4 18 19S17.6 20 17 20 16 19.6 16 19 16.4 18 17 18M9.1 19.7L8.8 19L9.1 18.3C10.4 15.1 13.5 13 17 13C18.9 13 20.6 13.6 22 14.6V8C22 6.9 21.1 6 20 6H16V4C16 2.9 15.1 2 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V19C2 20.1 2.9 21 4 21H9.8C9.5 20.6 9.3 20.2 9.1 19.7M10 4H14V6H10V4M17 15C14.3 15 11.9 16.7 11 19C11.9 21.3 14.3 23 17 23S22.1 21.3 23 19C22.1 16.7 19.7 15 17 15M17 21.5C15.6 21.5 14.5 20.4 14.5 19S15.6 16.5 17 16.5 19.5 17.6 19.5 19 18.4 21.5 17 21.5Z" />
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

export default {
  name: 'PedidosPage',
  components:{
    Page,
    DataTable,
    Column
  },
  setup(){
    const pedidos = ref([])

    const pedidosFetch = ()=>{
      return pedidosListar().then(({data})=>{
        pedidos.value = data
      }).catch(err=>{
        console.error(err.message);
      })
    }
    const handleView = (row) => {
      alert('ver del pedido: '+row._id)
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