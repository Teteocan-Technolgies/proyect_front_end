<template>
    <div class="register-container">
      <form class="register-form" @submit.prevent="register">
        <h2 class="form-title">Crear Cuenta</h2>
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Tu nombre"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="name">Apellido</label>
          <input
            type="text"
            id="apellido"
            v-model="apellido"
            placeholder="Apellido"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Tu correo electrónico"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Crea una contraseña"
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password2">Confirmar Contraseña</label>
          <input
            type="password"
            id="password2"
            v-model="password2"
            placeholder="Confirma tu contraseña"
            class="form-control"
          />
        </div>
        <button type="submit" class="btn-primary">Registrarse</button>
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
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px; /* Ajusta la altura mínima según sea necesario */
}

.register-form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 450px; /* Ajusta el ancho según sea necesario */
  max-width: 95%;
}

.form-title {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
  font-size: 0.9rem;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box; /* Importante para que el padding no aumente el ancho */
}

.btn-primary {
  background-color: #28a745;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 100%; /* Ocupar todo el ancho del contenedor */
  display: block; /* Para que el ancho funcione correctamente */
}

.btn-primary:hover {
  background-color: #1e7e34;
}
</style>