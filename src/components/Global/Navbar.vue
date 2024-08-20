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
            <li>
                Sair
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">

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
    }

    a {
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
</style>