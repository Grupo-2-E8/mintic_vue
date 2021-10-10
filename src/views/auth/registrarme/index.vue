<template>
  <section class="container">
    <form 
    class="row justify-content-center align-items-center flex-column caja"
    @submit="handleFormulario"
    >
      <div class="col-12 col-lg-4 col-xl-3">
        <div class="row">
          <div class="col-12 my-3">
            <h1><b>Formulario de registro</b></h1>
          </div>
          <div class="w-100 mb-2">
            <label for="correo" class="w-100 text-start">Correo electronico</label>
            <input 
            v-model="model.correo"
            id="correo" 
            type="email" 
            class="form-control"
            >
            <div class="text-danger w-100 text-start">{{errors.correo}}</div>
          </div>
          <div class="w-100 mb-2">
            <label for="clave" class="w-100 text-start">Contrasena</label>
            <input 
            id="clave"
            v-model="model.clave"
            type="password" 
            class="form-control"
            >
            <div class="text-danger w-100 text-start">{{errors.clave}}</div>
          </div>
          <div class="w-100 mb-2 mt-2">
            <button 
            type="submit" 
            class="btn btn-primary d-block w-100 py-3"
            >
              Registrarme ahora !
            </button>
            <button 
            type="button" 
            class="btn btn-outline-primary d-block w-100 py-3 my-3"
            @click="$router.back()"
            >
              Regresar al inicio de sesion
            </button>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import {useField,useForm} from 'vee-validate'
import {string,object} from 'yup'
import {registerService} from '../service'
import Swal from 'sweetalert2'
import {useRouter} from 'vue-router'
export default {
  name: 'RegisterPage',
  setup(){
    const router = useRouter()
    useField('correo',null,{ initialValue: '' })
    useField('clave',null,{ initialValue: '' })
    
    const validationSchema = object({
      correo: string().required().max(255).email(),
      clave: string().required().min(8)
    })
    const {
      values:model,
      errors,
      handleSubmit
    } = useForm({
      validationSchema,
      initialValues:{
        correo: '',
        clave: ''
      }
    })
    const handleFormulario = handleSubmit((values)=>{
      console.log({values});
      registerService(values).then(({data})=>{
        router.back()
        Swal.fire('Mensaje','Registrado con exito','success')
      }).catch(err=>{
        console.error(err.message);
        Swal.fire('Mensaje','Algo salio mal, regresa en unos minutos :)','error')
      })
    })
    return {
      model,
      errors,
      handleFormulario
    }
  }
}
</script>

<style lang="scss">
.caja{
  height: 100vh;
}
</style>