<template>
    <header>
        <nav>
            <div>
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/register">Register</RouterLink>
            </div>
        </nav>
    </header>
    <div>
        <RouterView />
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>