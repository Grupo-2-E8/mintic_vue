<template>
  <Page>
    <div class="container">
      <div class="row justify-content-center mt-4">
        
        <div class="col-12 col-sm-10 col-xl-5">
          <div class="card">
            <div class="card-body">
              <div class="col-sm-12 text-start mb-4">
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
              </div>
              
              <div class="w-100 text-start">
                <h2><b>Formulario Pedido</b></h2>
              </div>
              <form 
              @submit="handleSave"
              >
                <div class="w-100">
                  <label 
                  for="clienteId" 
                  class="d-flex"
                  >
                    Cliente
                  </label>
                  <Dropdown 
                  id="clienteId"
                  v-model="clienteSel" 
                  :options="clientes" 
                  optionLabel="nombres" 
                  placeholder="Seleccionar" 
                  class="w-100 text-start"
                  />
                  <div class="w-100 text-start text-danger">
                    {{errors.clienteId}}
                  </div>

                </div>
                <div class="w-100 my-4 d-flex">
                  <button 
                  type="button" 
                  class="btn btn-success m-1"
                  @click="handleItemAdd"
                  >
                    Agregar fila
                  </button>
                  <button 
                  type="submit" 
                  class="btn btn-primary m-1"
                  >
                    Guardar pedido
                  </button>
                </div>
                <div class="col-12 text-danger text-start mb-4">
                  {{errors.productos}}
                </div>
                <div class="w-100">
                  <DataTable :value="model.productos">
                    <Column 
                    header="-" 
                    field="producto" 
                    >
                      <template #body="{index}">
                        <button 
                        type="button" 
                        class="btn btn-danger px-0 py-0"
                        title="Remover"
                        @click="handleRowRemove(index)"
                        >
                          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                          </svg>
                        </button>
                      </template>
                    </Column>
                    <Column 
                    header="Producto" 
                    field="producto" 
                    >
                      <template #body="{data,index}">
                        <input 
                        v-model="data.producto"
                        type="text" 
                        class="form-control"
                        >
                        <div class="text-danger">{{errors[`productos[${index}].producto`]}}</div>
                      </template>
                    </Column>
                    <Column 
                    header="Cantidad" 
                    field="cantidad" 
                    >
                      <template #body="{data,index}">
                        <input 
                        v-model="data.cantidad"
                        type="number" 
                        class="form-control"
                        >
                        <div class="text-danger">{{errors[`productos[${index}].cantidad`]}}</div>
                      </template>
                    </Column>
                    <Column 
                    header="Precio" 
                    field="precio" 
                    >
                      <template #body="{data,index}">
                        <input 
                        v-model="data.precio"
                        type="number" 
                        class="form-control"
                        >
                        <div class="text-danger">{{errors[`productos[${index}].precio`]}}</div>
                      </template>
                    </Column>
                    <Column 
                    header="Total" 
                    >
                      <template #body="{data}">
                        <input 
                        :value="data.precio * data.cantidad"
                        type="number" 
                        class="form-control"
                        disabled
                        >
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </form>
              <div class="w-100 mt-3 text-end">
                <h1><b>Gran total ${{moneyFormat(total)}}</b></h1>
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
import {computed, onMounted, ref, watch} from 'vue'
import AutoComplete from 'primevue/autocomplete';
import {useField,useForm} from 'vee-validate'
import {clienteListar} from '../../clientes/service'
import Dropdown from 'primevue/dropdown';
import {object,string,array,number,date} from 'yup'
import {pedidosCrear} from '../service'
import Swal from 'sweetalert2'
import {useRouter} from 'vue-router'

export default {
  name: 'PedidosFormPage',
  components:{
    Page,
    DataTable,
    Column,
    AutoComplete,
    Dropdown
  },
  setup(){
    const router = useRouter()
    const clientes = ref([])
    const clienteSel = ref({})
    
    const handleItemAdd = () => {
      model.productos.push({
        id: null,
        producto: '',
        cantidad: 0,
        precio: 0
      })
    }
    
    const total = computed(()=>{
      return model.productos.reduce((total,item) => total += (item.cantidad * item.precio) ,0)
    })

    const validationSchema = object({
      estado: number().required().default(1),
      fecha: date().required().default(new Date()),
      clienteId: string().max(140).required(),
      transportadora: string().max(255),
      productos: array().of(object({
        producto: string().required().label('producto'),
        cantidad: number().required('requerido').min(0).label('cantidad').typeError('solo numeros'),
        precio: number().required('requerido').min(0).label('cantidad').typeError('solo numeros'),
      })).required().min(1)
    })

    const {
      values:model,
      errors,
      handleSubmit,
    } = useForm({
      validationSchema
    })

    useField('estado',null,{initialValue: 1,label: 'estado'})
    useField('fecha',null,{initialValue: new Date,label: 'fecha'})
    useField('clienteId',null,{initialValue: '',label: 'cliente'})
    useField('transportadora',null,{initialValue: ''})
    useField('productos',null,{initialValue: []})

    const handleSave = handleSubmit((values)=>{
      console.log(values);
      pedidosCrear(values).then(({data})=>{
        Swal.fire('Mensaje','Pedido creado','success')
        console.log(data);
        router.back()
      }).catch(err=>{
        console.error(err.message)
      })
    })

    const handleRowRemove = (index) => {
      console.log(index);
      model.productos.splice(index,1)
    }

    watch(()=>clienteSel.value,(currentValue,oldValue)=>{
      const {_id} = currentValue
      if(_id){
        model.clienteId = _id
      }
    })
    const moneyFormat = (value)=>{
      const instance = Intl.NumberFormat('de-DE')
      return instance.format(value)
    }
    onMounted(()=>{
      handleItemAdd()

      clienteListar().then(({data})=>{
        clientes.value = data
      }).catch(err=>{
        console.error(err.message)
      })
    })
    return {
      clientes,
      model,
      errors,
      clienteSel,
      total,
      handleItemAdd,
      handleRowRemove,
      handleSave,
      moneyFormat
    }
  }
}
</script>

<style lang="scss">
.container{
  height: 100vh;
}
</style>