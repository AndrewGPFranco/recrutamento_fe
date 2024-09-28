<template>
    <nav>
        <ul>
            <router-link>Exibir vagas</router-link>
            <router-link>Cadastrar vaga</router-link>
            <router-link>Minhas vagas</router-link>
        </ul>
    </nav>
</template>

<script lang="ts" setup></script>

<style scoped>
    nav {
        display: flex;
        height: 100vh;
        padding: 30px;
        align-items: center;
        justify-content: center;
        background-color: rgb(1, 17, 37);
    }

    nav ul {
        display: flex;
        flex-direction: column; 
        gap: 100px;
        list-style: none;
        justify-content: center;
        align-items: center;
    }

    nav ul a { text-decoration: none; padding: 12px; border-radius: 20px; background-color: cadetblue; color: black; }

    nav ul a:hover { background-color: rgb(83, 107, 139); }
</style>