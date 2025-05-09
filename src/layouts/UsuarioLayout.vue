<script setup>
import UserHeader from '@/components/usuario/UserHeader.vue'
import UserSidemenu from '@/components/usuario/UserSidemenu.vue';
import chatbot from '@/components/chatbot/chatbot.vue';
</script>
<template>
  <div class="container">
    <UserHeader class="header" />
    <UserSidemenu class="aside" />
    <router-view class="content" />
    <chatbot />
  </div>
</template>
<style scoped lang="scss">
.container {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
  position: relative;
  grid-template-areas:
    "header header"
    "aside content";

  grid-template-columns: 11.875rem 1fr;

  .header {
    grid-area: header;
  }

  .aside {
    grid-area: aside;
  }

  .content {
    padding: 0 0 12.5rem;
  }
}
</style>