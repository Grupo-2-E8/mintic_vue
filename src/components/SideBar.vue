<template>
  <Menubar :model="items"  />
</template>

<script>
import { ref } from "vue";
import Menubar from "primevue/menubar";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export default {
  components: {
    Menubar,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const salir = () => {
      store.dispatch('auth/logout') 
      router.push({name: 'auth.login'})
    }

    const items = ref([
      {
        label: "Pedidos",
        icon: "pi pi-fw pi-pencil",
        to:{ name: 'pedidos'}
      },
      {
        label: "Clientes",
        icon: "pi pi-fw pi-user",
        to:{ name: 'clientes'}
      },
      {
        label: "Cerrar sesion",
        icon: "pi pi-fw pi-power-off",
        command: salir
        //to:{ name: 'auth.login'}
      },
    ])
    
    return {
      items,
    }
  },
};
</script>

<style lang="scss">
.sidebar-padre {
  width: 170px;
}
</style>