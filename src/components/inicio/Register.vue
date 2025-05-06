<template>
    <div class="form_register">
        <form @submit.prevent="register">
            <input type="text" v-model="name" placeholder="Nombre">
            <input type="text" v-model="apellido" placeholder="Apellido">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Contraseña">
            <input type="password" v-model="password2" placeholder="Confirmar contraseña">
            <button type="submit">Registrarse</button>
        </form>
    </div>
</template>


<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const name =ref('')
const apellido = ref('')
const email =ref('')
const password =ref('')
const password2 =ref('')
const authStore = useAuthStore()

async function register() {
    try {
        await authStore.register(name.value, apellido.value, email.value, password.value)
    } catch (error) {
        console.error(error)
    } finally {
        name.value = ''
        email.value = ''
        password.value = ''
        password2.value = ''
    }
}
</script>