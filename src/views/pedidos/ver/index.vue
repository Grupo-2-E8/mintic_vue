<template>
  <section>
    <div class="container">
      <div class="row my-5">
        <!-- <div class="col-sm-12 text-start mb-4">
          <button 
          type="button" 
          class="btn btn-primary d-flex align-items-center"
          @click="$router.back()"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
            <span> Volver </span>
          </button>
        </div> -->

        <div class="col-12 text-center mb-2">
          <h1 class="text-uppercase"><b>Resumen general del pedido</b></h1>
        </div>
        <div class="col-12 text-start">
          <h2><b>Pedido Num:</b> {{pedido._id}} </h2>
        </div>
        <div class="row">
          <div class="col-md-4 mb-2">
            <div class="card">
              <div class="card-header">Fecha</div>
              <div class="card-body py-4">
                <div class="w-100">{{setFecha(pedido.createdAt)}}</div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-2">
            <div class="card">
              <div class="card-header">Cant. Productos</div>
              <div class="card-body py-4">
                <div class="w-100">{{pedido.productos.length}}</div>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-2">
            <div class="card">
              <div class="card-header">Estado</div>
              <div class="card-body py-4">
                <div class="w-100">{{ pedido.estados.length ? pedido.estados[0].estado : 'sin estado'}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <DataTable :value="pedido.productos">
            <Column header="Producto" field="producto" sortable />
            <Column header="Cantidad" field="cantidad" sortable />
            <Column header="Precio" field="precio" sortable />
            <Column header="Total">
              <template #body="{data}">
                {{moneyFormat(data.cantidad * data.precio)}}
              </template>
            </Column>
          </DataTable>
        </div>
        <div class="col-12 text-end mb-4">
          <h1>${{moneyFormat(total)}}</h1>
        </div>
        <div class="col-sm-12 text-start mb-3">
          <h2><b>Línea de tiempo</b></h2>
        </div>
        <div class="col-12">
          <Timeline :value="pedido.estados"> 
            <template #opposite="slotProps">
              <small class="p-text-secondary">{{setFecha(slotProps.item.fecha)}}</small>
            </template>
            <template #content="slotProps">
              <div class="d-flex flex-column">
                <div class="fw-bold text-uppercase">{{slotProps.item.estado}} </div>
                <div>{{slotProps.item.justificacion}} </div>
              </div>
            </template>
          </Timeline>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Page from '../../../components/Page.vue'
import {computed, onMounted, ref} from 'vue'
import {pedidosBuscar} from '../service'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Timeline from 'primevue/timeline';


export default {
  name: 'PedidoVerPage',
  components:{ 
    Page, 
    DataTable,
    Column,
    Timeline
  },
  setup(){
    const route = useRoute()
    const pedido = ref({
      _id: null,
      productos: [],
      estados: []
    })
    
    const total = computed(()=>{
      return pedido.value.productos.reduce((total,item)=> total += (item.cantidad * item.precio),0)
    })
    const setFecha = (value)=>{
      return dayjs(value).format('DD MMM YYYY HH:mm')
    }
    const moneyFormat = (value)=>{
      const instance = Intl.NumberFormat('de-DE')
      return instance.format(value)
    }
    const pedidoFetch = ()=>{
      const {id} = route.params
      return pedidosBuscar(id).then(({data})=>{
        pedido.value = data
      }).catch(err=>{
        console.error(err.message);
      })
    }
    
    onMounted(()=>{
      pedidoFetch()
    })
    
    return {
      pedido,
      total,
      setFecha,
      moneyFormat
    }
  }

}
</script>

<style>

</style>