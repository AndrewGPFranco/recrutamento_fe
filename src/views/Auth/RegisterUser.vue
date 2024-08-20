<template>
    <nav>
        <Navbar />
    </nav>
    <main>
        <FormRegister />
    </main>
</template>

<script setup lang="ts">
import Navbar from "@/components/Global/Navbar.vue";
import FormRegister from "../../components/Auth/FormRegister.vue"
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