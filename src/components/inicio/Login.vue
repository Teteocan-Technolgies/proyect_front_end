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
import { useAuthStore } from '@/stores/auth';

const correo = ref('');
const password = ref('');
const authStore = useAuthStore();


async function login() {
    try {
        await authStore.login(correo.value, password.value);
        console.log('login');
    } catch (error) {
        console.error(error);
    } finally {
        correo.value = '';
        password.value = '';
    }
}

</script>

<style scoped>
</style>

