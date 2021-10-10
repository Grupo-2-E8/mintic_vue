<template>
  <Page>
    <div class="d-flex w-100 p-4">
      <router-link 
      :to="{name:'clientes.form'}" 
      class="btn btn-primary d-flex align-items-center"
      >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z" />
        </svg>
        <span class="ml-2"> Crear nuevo cliente </span>
      </router-link>
    </div>
    <div class="p-4">
      <DataTable 
      :value="getClientes"
      >
        <Column header="nombres" field="nombres"  sortable />
        <Column 
        header="identificacion" 
        field="identificacion"  
        />
        <Column header="Correo electronico" field="correo"  />
        <Column header="Acciones">
          <template #body>
            <button 
            type="button" 
            class="btn btn-danger m-1"
            >
              Eliminar
            </button>
            <button 
            type="button" 
            class="btn btn-primary m-1"
            >
              Editar
            </button>
          </template>
        </Column>
      </DataTable>
    </div>
  </Page>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {computed, ref} from 'vue'
import Page from '../../components/Page.vue'
export default {
  components:{
    DataTable,
    Column,
    Page
  },
  setup(){
    const visibleLeft = ref(false)
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
    const handleMenuToggle = ()=>{
      visibleLeft.value = !visibleLeft.value
    }
    return {
      getClientes,
      visibleLeft,
      handleMenuToggle
    }
  }

}
</script>

<style>

</style>