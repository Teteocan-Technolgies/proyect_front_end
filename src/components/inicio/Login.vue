<template>
    <div class="form_login">
        <form @submit.prevent="login">
            <input type="email" v-model="correo" placeholder="Email" :required="true">
            <input type="current-password" v-model="password" placeholder="Contraseña" :required="true">
            <input type="submit" value="Ingresar">
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const correo = ref('');
const password = ref('');


async function login(params) {
    try {
        const response = await useAuthStore.register(credentials)
    } catch (error) {
        
    }
}

</script>

<style scoped>
</style>

