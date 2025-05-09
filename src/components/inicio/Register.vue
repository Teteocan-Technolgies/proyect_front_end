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
<style scoped lang="scss">
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
}

.register-form {
  background-color: #fff;
  padding: 2rem;
  border-radius: 1.25rem; // igual que en el modal: bordes suaves
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  display: grid;
  gap: 1rem;
}

.form-title {
  text-align: center;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.form-group {
  display: grid;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  color: #444;
  font-size: 0.95rem;
}

.form-control {
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f5f5f5;
  color: #333;

  &:focus {
    outline: none;
    border-color: #28a745;
    background-color: #fff;
  }
}

.btn-primary {
  background-color: #28a745;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #1e7e34;
  }
}
</style>