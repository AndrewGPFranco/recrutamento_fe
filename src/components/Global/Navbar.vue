<template>
    <nav>
        <router-link :to="{name: 'home'}">RECRUT</router-link>
        <ul>
            <li>
                <router-link :to="{name: 'register-user'}">Registrar-se</router-link>
            </li>
            <li>
                <router-link :to="{name: 'login'}">Login</router-link>
            </li>
            <button @click="logout()">
                Sair
            </button>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
    router.push({name: 'home'})
}
</script>

<style scoped>
    nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
    }

    ul {
        display: flex;
        gap: 40px;
        list-style: none;
        align-items: center;
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    button {
        padding: 10px;
    }
</style>