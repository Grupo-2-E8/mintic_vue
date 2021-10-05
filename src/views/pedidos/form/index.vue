<template>
  <Page>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-12 col-xl-4">
          <div class="card">
            <div class="card-body">
              <div class="w-100">
                <h2>Formulario Pedido</h2>
              </div>
              <form>
                <div class="w-100">
                  <label for="" class="d-flex">Cliente</label>
                  <input type="text" class="form-control">
                </div>
              </form>
              <div class="w-100 my-4 d-flex">
                <button 
                type="button" 
                class="btn btn-success m-1"
                @click="handleItemAdd"
                >
                  Agregar fila
                </button>
                <button type="button" class="btn btn-primary m-1">
                  Guardar pedido
                </button>
              </div>
              <div class="w-100">
                <DataTable :value="items">
                  <Column 
                  header="Producto" 
                  field="producto" 
                  >
                    <template #body="{data}">
                      <input 
                      v-model="data.producto"
                      type="text" 
                      class="form-control"
                      >
                    </template>
                  </Column>
                  <Column 
                  header="Cantidad" 
                  field="cantidad" 
                  >
                    <template #body="{data}">
                      <input 
                      v-model="data.cantidad"
                      type="number" 
                      class="form-control"
                      >
                    </template>
                  </Column>
                  <Column header="Precio" field="precio * cantidad" />
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<script>
import Page from '../../../components/Page.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import {ref} from 'vue'
export default {
  name: 'pedidosFormPage',
  components:{
    Page,
    DataTable,
    Column
  },
  setup(){
    const items = ref([ ])
    const handleItemAdd = ()=>{
      items.value.push({
        id: null,
        producto: 'zapatos'
      })
    }
    return {
      items,
      handleItemAdd
    }
  }
}
</script>

<style>

</style>