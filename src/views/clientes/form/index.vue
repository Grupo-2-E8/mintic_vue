<template>
  <section class="container">
    <div class="row justify-content-center align-items-center h-100">
      <form 
      class="needs-validation col-12 col-sm-4" 
      @submit="handleSave"
      >
        <div class="col-12 text-start mb-3">
          <button 
          class="btn btn-primary m-1 d-flex align-items-center" 
          type="button"
          @click="$router.back()"
          >
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
            Volver
          </button>
        </div>
          <div class="col-md-12 mb-3">
            <h1><b>Formulario crear cliente</b></h1>
          </div>

          <div class="col-md-12 mb-3">
            <label 
            for="validarNombre"
            class="w-100 text-start"
            >
              Nombre:
            </label>
            <input
            v-model="model.nombres"
            type="text"
            class="form-control"
            id="validarNombre"
            name="validarNombre"
            />
            <div class="text-danger w-100 text-start">
              {{errors.nombres}}
            </div>
          </div>
          
          <div class="col-md-12 mb-3">
            <label 
            for="validarIdentificacion"
            class="w-100 text-start"
            >
              Identificacion:
            </label>
            <input
            v-model="model.identificacion"
            type="text"
            class="form-control"
            id="validarIdentificacion"
            />
            <div class="text-danger w-100 text-start">
              {{errors.identificacion}}
            </div>
          </div>
        
          <div class="col-md-12 mb-3">
            <label 
            for="validarApellidos"
            class="w-100 text-start"
            >
              Apellidos
            </label>
            <input
            v-model="model.apellidos"
            type="text"
            class="form-control"
            id="validarApellidos"
            name="validarApellidos"
            />
            <div class="text-danger w-100 text-start">
              {{errors.apellidos}}
            </div>
          </div>
        

        
          <div class="col-md-12 mb-3">
            <label 
            for="validarEmail" 
            class="w-100 text-start"
            >
              Correo electronico
            </label>
            <input
            v-model="model.correo"
            type="email"
            class="form-control"
            id="validarEmail"
            name="validarEmail"
            />
            <div class="text-danger w-100 text-start">
              {{errors.correo}}
            </div>
          </div>
        

        
          <div class="col-md-12 mb-3">
            <label 
            for="validarTelefono" 
            class="w-100 text-start"
            >
              Teléfono:
            </label>
            <input
            v-model="model.telefono"
            type="number"
            class="form-control"
            id="validarTelefono"
            name="validarTelefono"
            max="999999999"
            />
            <div class="text-danger w-100 text-start">
              {{errors.telefono}}
            </div>
          </div>
        

        <div class="group mb-10">
          <button 
          class="btn btn-success m-1"  
          type="submit"
          >
            Guardar
          </button>
          <button 
          class="btn btn-outline-warning m-1" 
          type="reset"
          @click="handleReset "
          >
            Limpiar
          </button>
          
        </div>
        
      </form>
    </div>
  </section>
</template>

<script>
import {useField,useForm} from 'vee-validate'
import {object,string} from 'yup'
import { clienteGuardar } from '../service'
import Swal from 'sweetalert2'
import {useRouter} from 'vue-router'

export default {
  setup(){
    const router = useRouter()
    const validationSchema = object({
      nombres: string().required().max(140),
      identificacion: string().required().max(140),
      apellidos: string().required().max(140),
      correo: string().email().required(),
      telefono: string().required().max(40)
    })
    const { 
      handleSubmit,
      handleReset,
      values: model,
      errors
    } = useForm({
      validationSchema
    })
    
    useField('nombres',null,{initialValue: ''})
    useField('identificacion',null,{initialValue: ''})
    useField('apellidos',null,{initialValue: ''})
    useField('correo',null,{initialValue: ''})
    useField('telefono',null,{initialValue: ''})
    
    const handleSave = handleSubmit((values)=>{
      console.log(values);
      clienteGuardar(values).then(({data})=>{
        Swal.fire('Mensaje','Cliente agregado','success')
        router.back()
      }).catch(err=>{
        console.error(err.message);
      })
    })

    return {
      handleSave,
      handleReset,
      model,
      errors
    }
  }
}
</script>
<style scoped lang="scss">
.container{
  height: 100vh;
  // background: red;
}
</style>