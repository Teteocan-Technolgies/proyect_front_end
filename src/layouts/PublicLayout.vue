<template>
  <div class="container">
    <header>
          <h1>dashboard login</h1>
    </header>
    <div class="wrapper">
      <RouterView />

      <div class="auth-links">
        <RouterLink to="/login" class="auth-button">Login</RouterLink>
        <RouterLink to="/register" class="auth-button">Register</RouterLink>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { RouterLink, RouterView } from 'vue-router';
  </script>
  
  <style scoped>
  .container {
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr
  }

  header {
    background-color: #f8f9fa;
    padding: 1rem 0;
    border-bottom: 1px solid #dee2e6;
  }
  
  nav div {
    text-align: center;
  }
  
  h1 {
    margin: 0;
    color: #343a40;
    text-transform: uppercase;
    text-align: center;
  }
  
  .auth-links {
    display: flex;
    justify-content: center; /* Centra los botones horizontalmente */
    gap: 1rem; /* Espacio entre los botones */
    padding: 1.5rem 0; /* Espacio arriba y abajo de los botones */
  }
  
  .auth-button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 0.25rem;
    transition: background-color 0.3s ease;
    border: 1px solid transparent;
  }
  
  .auth-button:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  .wrapper {
    display: grid;
    align-content: center;
  }
  </style>