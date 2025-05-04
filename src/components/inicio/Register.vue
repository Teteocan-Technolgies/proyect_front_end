<template>
    <div class="form_register">
        <form @submit.prevent="register">
            <input type="text" v-model="name" placeholder="Nombre">
            <input type="email" v-model="email" placeholder="Email">
            <input type="password" v-model="password" placeholder="Contraseña">
            <input type="password" v-model="password2" placeholder="Confirmar contraseña">
            <button type="submit">Registrarse</button>
        </form>
    </div>
</template>


<script setup>
import { ref } from 'vue'

const name =ref('')
const email =ref('')
const password =ref('')
const password2 =ref('')

async function register() {
    try {
        
    } catch (error) {
        
    }
}
</script>