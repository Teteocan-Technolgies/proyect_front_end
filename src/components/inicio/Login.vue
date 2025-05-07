<template>
    <div class="login-container">
      <form class="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="correo"
            placeholder="Tu correo electrónico"
            required
            class="form-control"
          />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Tu contraseña"
            required
            class="form-control"
          />
        </div>
        <button type="submit" class="btn-primary">Ingresar</button>
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
    } catch (error) {
        console.error(error);
    } finally {
        correo.value = '';
        password.value = '';
    }
}

</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px; /* Añade una altura mínima para centrar mejor */
}

.login-form {
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px; /* Ancho fijo para el formulario */
  max-width: 90%; /* Asegura que no se desborde en pantallas pequeñas */
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
