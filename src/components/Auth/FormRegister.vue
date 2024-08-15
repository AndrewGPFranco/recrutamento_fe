<template>
    <div class="form-box">
        <form class="form" @submit.prevent="registerUser">
            <span class="title">Inscrever-se</span>
            <span class="subtitle">Crie uma conta com seu e-mail.</span>
            <div class="form-container">
                <input type="text" class="input" placeholder="Usuário" v-model="username">
                <input type="email" class="input" placeholder="Email" v-model="login">
                <input type="password" class="input" placeholder="Senha" v-model="password">
            </div>
            <button>Cadastrar-se</button>
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
        overflow: hidden;
        border-radius: 8px;
        background-color: #fff;
        margin: 1rem 0 .5rem;
        width: 100%;
    }

    .input {
        background: none;
        border: 0;
        outline: 0;
        height: 40px;
        width: 100%;
        border-bottom: 1px solid #eee;
        font-size: .9rem;
        padding: 8px 15px;
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

    .form button {
        background-color: #0066ff;
        color: #fff;
        border: 0;
        border-radius: 24px;
        padding: 10px 16px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color .3s ease;
    }

    .form button:hover {
        background-color: #005ce6;
    }
</style>