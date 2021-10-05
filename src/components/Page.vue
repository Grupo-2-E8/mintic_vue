<template>
  <section>
    <SideBar />
    <slot />
  </section>
</template>

<script>
import SideBar from '../components/SideBar.vue'
export default {
  components:{
    SideBar
  }
}
</script>

<style>

</style>