<template>
    <nav>
        <router-link :to="{name: 'home'}">RECRUT</router-link>
        <ul>
            <li v-if="!logado && route !== 'register-user'">
                <router-link :to="{name: 'register-user'}">Registrar-se</router-link>
            </li>
            <li v-if="!logado && route !== 'login'">
                <router-link :to="{name: 'login'}">Login</router-link>
            </li>
            <p v-if="user">{{ user.username }}</p>
            <button @click="logout()" v-if="logado">
                Sair
            </button>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

let route = router.currentRoute.value.name

const authStore = useAuthStore();
let logado = authStore.getToken?.length === 0 ? false : true

const logout = () => {
    authStore.logout();
}

const token = localStorage.getItem('token')

const user = authStore.getUser == undefined ? "" : authStore.getUser

if(token != undefined) {
    authStore.getUserData(token)
    authStore.getUser
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