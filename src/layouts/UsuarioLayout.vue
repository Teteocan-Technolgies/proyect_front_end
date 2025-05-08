<script setup>
import UserHeader from '@/components/usuario/UserHeader.vue'
import UserSidemenu from '@/components/usuario/UserSidemenu.vue';
</script>
<template>
  <div class="container">
    <UserHeader class="header" />
    <UserSidemenu class="aside" />
    <router-view class="content" />
  </div>
</template>
<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "aside content";

  grid-template-columns: 190px 1fr;

  .header {
    grid-area: header;
  }

  .aside {
    grid-area: aside;
  }

  .content {
    padding: 0 0 40px;
  }
}
</style>