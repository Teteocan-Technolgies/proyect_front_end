<script setup>
import { useAuthStore } from '@/stores/auth';

let identity = localStorage.getItem('user');
identity = identity ? JSON.parse(identity) : null;

const auth = useAuthStore();
const logout = () => {
    auth.logout();
}

</script>
<template>
    <header>
        <div class="container">
            <h2>YourStore</h2>
            <!-- {{ identity }} -->
            <div class="user__data">
                <button class="logout" @click="logout">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2">
                        </path>
                        <path d="M9 12h12l-3 -3"></path>
                        <path d="M18 15l3 -3"></path>
                    </svg>
                </button>

                <h3>{{ identity.nombre }} {{ identity.apellido }}</h3>
            </div>
        </div>
    </header>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1f1f1f;
  padding: 1rem 2rem;
  border-bottom: 1px solid #333;
  color: #fff;

  .user__data {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0 0.5rem;

    img {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      object-fit: cover;
    }

    span {
      font-size: 0.95rem;
      font-weight: 500;
      color: #eee;
    }
  }
}

.logout {
  background-color: #2e2e2e;
  border-radius: 50%;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;

  svg {
    color: #ccc;
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background-color: #444;
  }
}
</style>