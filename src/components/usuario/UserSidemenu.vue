<script setup>
import { reactive } from 'vue';

const buttons = reactive([
    {
        'title': 'Productos',
        'link': '/inicio/productos',
    },
    {
        'title': 'Ventas',
        'link': '/inicio/ventas',
    },
    {
        'title': 'Usuarios',
        'link': '/inicio/usuarios',
    },
])
</script>
<template>
    <aside>
        <router-link v-for="button in buttons" :to="button.link">{{ button.title }}</router-link>
    </aside>
</template>
<style scoped lang="scss">
aside {
  display: grid;
  grid-auto-rows: max-content;
  padding: 1rem 1.5rem;
  background-color: #222;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  
  .menu-item {
    color: #ccc;
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #333;
    }

    &.active {
      background-color: #444;
      color: #fff;
    }
  }
}

</style>