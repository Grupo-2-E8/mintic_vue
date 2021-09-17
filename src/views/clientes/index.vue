<template>
  <section>
    <Sidebar v-model:visible="visibleLeft">
      <div class="d-flex w-100 flex-column">
        <router-link :to="{name: 'clientes'}" class="w-100 mb-2">
          Clientes
        </router-link>
        <router-link :to="{name: 'pedidos'}" class="w-100 mb-2">
          Pedidos
        </router-link>
      </div>
    </Sidebar>
    <button 
    type="button" 
    class="btn btn-primary mt-2"
    @click="handleMenuToggle"
    >
      Ver menu
    </button>
    <div class="d-flex w-100 p-4">
      <div class="card my-3">
        <div class="card-body">
          <h1>Mis clientes</h1>
        </div>
      </div>
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
  </section>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {computed, ref} from 'vue'
import Sidebar from 'primevue/sidebar';

export default {
  components:{
    DataTable,
    Column,
    Sidebar
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