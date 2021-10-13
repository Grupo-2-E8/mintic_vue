<template>
  <Page>
    <div class="Container">
      <h1><b>Bienvenido</b></h1>      
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
<style scoped lang="scss">
.Container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
