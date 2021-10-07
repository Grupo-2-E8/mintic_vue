<template>
  <section
    class="d-flex justify-content-center align-items-center h-100 w-100"
  >
    <div class="card formulario">
      <div class="card-body">
        <form @submit="handleLogin">          
          <div class="w-100 my-2 mb-3">
            <h2>Inicio de Sesion</h2>
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
            class="btn btn-primary w-100"
            >
              Ingresar
            </button>
            <router-link to="/" class="btn btn-primary">
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
export default {
  name: 'LoginPage',
  setup(){
    useLogin()
    const router = useRouter()
    const validationSchema = object({
      'correo': string().max(255).required(),
      'clave': string().min(6)
    })
    
    const initialValues = {
      correo: '',
      clave: ''
    }

    useField('correo',null)
    useField('clave',null)
    
    const {
      handleSubmit,
      values:model,
      errors
    } = useForm({
      validationSchema,
      initialValues
    })
    
    const handleLogin = handleSubmit((values)=>{
      console.log({values})
      router.push({name: 'Home'})
      loginService(values).then(()=>{
        console.log(result)
      }).catch(err=>{
        console.error(err.message);
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