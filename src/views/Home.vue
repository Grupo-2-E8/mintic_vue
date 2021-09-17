<template>
  <div class="home">

    <router-link :to="{name: 'clientes'}" class="">
      Ir a clientes
    </router-link>
    <br>
    
    <router-link :to="{name: 'pedidos'}">
      Ir a pedidos
    </router-link>
  </div>
</template>

<script>

export default {
  name: 'Home'
}
</script>
