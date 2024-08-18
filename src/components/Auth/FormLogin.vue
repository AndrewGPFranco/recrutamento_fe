<template>
    <main>
        <div class="feedback" id="feedback" v-if="feedbackMessage">
            <n-alert title="Status" type="error" closable>
                Erro ao efetuar o login, verifique os dados...
            </n-alert>
        </div>
        <div class="form-box">
            <form class="form">
                <div class="titles">
                    <h2 class="title">Efetuar Login</h2>
                </div>
                <div class="form-container">
                    <n-input id="inputEmail" v-model:value="login" type="email" placeholder="Email"  />
                    <n-input id="inputPassword" v-model:value="password" type="password" show-password-on="mousedown" placeholder="Password" :maxlength="30" />
                </div>
                <n-button id="buttonRegister" type="info" @click="efetuarLogin()">
                    Entrar
                </n-button>
            </form>
        </div>
    </main>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const feedbackMessage = ref<boolean>();
const login = ref<string>("")
const password = ref<string>("")
const authStore = useAuthStore()

const efetuarLogin = async () => {
    await authStore.login(login.value, password.value)
    if(authStore.getStatus == 200) {
        router.push({name: 'home'})
    } else {
        feedback()
    }
}

const feedback = () => {
    feedbackMessage.value = true
    setTimeout(() => {
        feedbackMessage.value = false
    }, 5000)
}
</script>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .form-box {
        max-width: 370px;
        background: #f1f7fe;
        overflow: hidden;
        color: #010101;
    }

    .form {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 32px 24px 24px;
        gap: 16px;
    }

    .titles {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    .form-container {
        border-radius: 8px;
        background-color: #fff;
        margin: 1rem 0 .5rem;
        width: 100%;
    }
</style>