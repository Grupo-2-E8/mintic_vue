<template>
  <Menubar :model="items"  />
</template>

<script>
import { ref } from "vue";
import Menubar from "primevue/menubar";

export default {
  components: {
    Menubar,
  },
  setup() {
    const items = ref([
      {
        label: "Pedidos",
        icon: "pi pi-fw pi-pencil",
        to: 'pedidos'
      },
      {
        label: "Clientes",
        icon: "pi pi-fw pi-user",
        to: 'clientes'
      },
      {
        label: "Cerrar sesion",
        icon: "pi pi-fw pi-power-off",
        to: 'login'
      },
    ]);
    return {
      items,
    };
  },
};
</script>

<style lang="scss">
.sidebar-padre {
  width: 170px;
}
</style>