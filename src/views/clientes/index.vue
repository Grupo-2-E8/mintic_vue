<template>
  <section>
    <div class="">
      <h1>Mis clientes</h1>
    </div>
    <DataTable 
    :value="getClientes"
    >
      <Column header="nombres" field="nombres"  sortable />
      <Column header="identificacion" field="identificacion"  />
      <Column header="Correo electronico" field="correo"  />
    </DataTable>
  </section>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {computed, ref} from 'vue'
export default {
  components:{
    DataTable,
    Column
  },
  setup(){
    const clientes = ref([
      {
        nombres: 'pepito perez',
        identificacion: 1099,
        correo: 'correo@electronico.com',
      },
      {
        nombres: 'Roldolfo perez',
        identificacion: 1099,
        correo: 'rodolfo.perez@electronico.com',
      }
    ])
    const getClientes = computed(() => clientes.value)
    return {
      getClientes
    }
  }

}
</script>

<style>

</style>