<template>
  <section
    class="d-flex justify-content-center align-items-center h-100 w-100"
  >
    <div class="card formulario">
      <div class="card-body">
        <form @submit="handleLogin">          
          <div class="w-100 my-2 mb-3">
            <h1><b>Inicio de Sesion</b></h1>
          </div>
          <div class="w-100 mb-3 ">
            <label 
            for="correo" 
            class="d-flex"
            >
              Correo electronico
            </label>
            <input
            v-model="model.correo"
            id="correo"
            type="email"
            class="form-control d-flex"
            placeholder="correo@electronico.com"
            />
            <div class="text-danger d-flex">
              {{errors.correo}}
            </div>
          </div>
          <div class="w-100 mb-4">
            <label for="clave" class="d-flex">Contrasena</label>
            <input 
            v-model="model.clave"
            id="clave"
            type="password" 
            class="form-control" 
            placeholder="******" 
            />
            <div class="text-danger d-flex">
              {{errors.clave}}
            </div>
          </div>
          <div class="w-100 mb-2 ">
            <button 
            type="submit" 
            class="btn btn-primary w-100 mb-4"
            >
              Ingresar
            </button>
            <router-link 
            :to="{name: 'auth.registrarme'}" 
            class="btn btn-primary w-100"
            >
              Registrarme
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { useField, useForm} from 'vee-validate'
import {useRouter} from 'vue-router'
import {useLogin} from './useLogin'
import {string,object} from 'yup'
import {loginService} from '../service'
import Swal from 'sweetalert2'
import {useStore} from 'vuex'

export default {
  name: 'LoginPage',
  setup(){
    const store = useStore()
    useLogin()
    const router = useRouter()
    const validationSchema = object({
      'correo': string().max(255).required(),
      'clave': string().min(6)
    })
    

    
    
    const {
      handleSubmit,
      values:model,
      errors
    } = useForm({
      validationSchema,
      initialValues:{
        correo: '',
        clave: ''
      }
    })

    useField('correo',null,{ initialValue: '' })
    useField('clave',null,{ initialValue: '' })
    
    const handleLogin = handleSubmit((values)=>{
      loginService(values).then(async({data})=>{
        console.log(data)
        console.log(store.getters);
        store.dispatch('auth/saveToken',data)
        await store.dispatch('auth/fetchUser')
        router.push({name: 'Home'})
      }).catch(err=>{
        console.error(err.message);
        if(err.response.status === 400 ){
          model.clave = ''
          Swal.fire('Mensaje','Crendenciales no validas','warning')
        }
      })
    })

    return {
      handleLogin,
      model,
      errors
    }
  }
};
</script>

<style lang="scss">
#app{
  height: 100vh;
}
.formulario{
  width: 100%;
}
@media only screen and (min-width: 660px) {
  .formulario{
    width: 340px;
  }
}
</style>