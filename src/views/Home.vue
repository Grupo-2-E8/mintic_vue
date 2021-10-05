<template>
  <Page>
    <div class="home">
      <!-- <SideBar /> -->
      <router-link :to="{name: 'clientes'}" class="">
        Ir a clientes
      </router-link>
      <br>
      
      <router-link :to="{name: 'pedidos'}">
        Ir a pedidos
      </router-link>
    </div>
  </Page>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import Page from '../components/Page.vue'
export default {
  name: 'Home',
  components:{
    SideBar,
    Page
  }
}
</script>
