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
      <DataTable :value="info">
        <Column header="ID" field="id" />
        <Column header="Cliente" field="clienteNombre" />
        <Column header="Estado" />
        <Column header="Fecha" />
        <Column header="Acciones" />
      </DataTable>
    </div>
  </Page>
</template>

<script>
import Page from '../../components/Page.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {ref} from 'vue'
export default {
  components:{
    Page,
    DataTable,
    Column
  },
  setup(){
    const info = ref([
      {
        id: '1',
        clienteNombre: 'juan apellidos'
      }
    ])
    return {
      info
    }
  }
}
</script>

<style>

</style>