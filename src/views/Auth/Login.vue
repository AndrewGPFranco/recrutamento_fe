<template>
    <main>
        <FormLogin />
    </main>
</template>

<script setup lang="ts">
import FormLogin from '@/components/Auth/FormLogin.vue';
</script>

<style scoped>
main {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>