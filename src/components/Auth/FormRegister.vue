<template>
    <div class="form-box">
        <form class="form" @submit.prevent="registerUser">
            <span class="title">Inscrever-se</span>
            <span class="subtitle">Crie uma conta com seu e-mail.</span>
            <div class="form-container">
                <n-input v-model:value="username" type="text" placeholder="Username" />
                <n-input v-model:value="login" type="email" placeholder="Email" />
                <n-input v-model:value="password" type="password" show-password-on="mousedown" placeholder="Password" :maxlength="30" />
            </div>
            <n-button type="info">
                Cadastrar-se
            </n-button>
        </form>
        <div class="form-section">
            <p>Já tem uma conta? <router-link to="/">Login</router-link></p>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

export default {
    name: "Formulario-Registro-Usuario",
    setup() {
        const username = ref("")
        const login = ref("")
        const password = ref("")

        const authStore = useAuthStore()

        const registerUser = async () => {
            await authStore.register(username.value, login.value, password.value)
            username.value = ""
            login.value = ""
            password.value = ""
        }

        return {
            username,
            login,
            password,
            registerUser
        }
    }
}

</script>

<style scoped>
    .form-box {
        max-width: 300px;
        background: #f1f7fe;
        overflow: hidden;
        border-radius: 16px;
        color: #010101;
    }

    .form {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 32px 24px 24px;
        gap: 16px;
        text-align: center;
    }

    .title {
        font-weight: bold;
        font-size: 1.6rem;
    }

    .subtitle {
        font-size: 1rem;
        color: #666;
    }

    .form-container {
        border-radius: 8px;
        background-color: #fff;
        margin: 1rem 0 .5rem;
        width: 100%;
    }

    .form-section {
        padding: 16px;
        font-size: .85rem;
        background-color: #e0ecfb;
        box-shadow: rgb(0 0 0 / 8%) 0 -1px;
    }

    .form-section a {
        font-weight: bold;
        color: #0066ff;
        transition: color .3s ease;
        text-decoration: none;
    }

    .form-section a:hover {
        color: #005ce6;
        text-decoration: underline;
    }
</style>