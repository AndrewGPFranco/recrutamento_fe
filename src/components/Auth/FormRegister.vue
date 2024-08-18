<template>
    <main>
        <div class="feedback" id="feedback" v-if="feedbackMessage">
            <n-alert :title="feedbackTitle" :type="feedbackType" closable>
                {{ feedbackMessage }}
            </n-alert>
        </div>
        <div class="form-box">
            <form class="form">
                <div class="titles">
                    <span class="title">Inscrever-se</span>
                    <span class="subtitle">Crie uma conta com seu e-mail.</span>
                </div>
                <div class="form-container">
                    <n-input id="inputUsername" v-model:value="username" type="text" placeholder="Usuário" />
                    <n-input id="inputEmail" v-model:value="login" type="email" placeholder="Email"  />
                    <n-input id="inputPassword" v-model:value="password" type="password" show-password-on="mousedown" placeholder="Password" :maxlength="30" />
                </div>
                <n-button id="buttonRegister" type="info" @click="registerUser()">
                    Cadastrar-se
                </n-button>
            </form>
            <div class="form-section">
                <p>Já tem uma conta? <router-link :to="{ name: 'login'}">Login</router-link></p>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';

export default {
    name: "Formulario-Registro-Usuario",
    setup() {
        const username = ref<string>("")
        const login = ref<string>("")
        const password = ref<string>("")
        const feedbackMessage = ref<string | null>(null)
        const feedbackType = ref<string>("")
        const feedbackTitle = ref<string>("")

        const authStore = useAuthStore()

        const registerUser = async () => {
            await authStore.register(username.value, login.value, password.value)
            if(authStore.getStatus == 200) {
                feedback(true)
            } else {
                feedback(false)
            }
            username.value = ""
            login.value = ""
            password.value = ""
        }

        const feedback = (status: boolean) => {
            if (status) {
                feedbackType.value = "success"
                feedbackTitle.value = "Status"
                feedbackMessage.value = "Usuário cadastrado com sucesso!"
            } else {
                feedbackType.value = "error"
                feedbackTitle.value = "Status"
                feedbackMessage.value = "Ocorreu um erro ao cadastrar o usuário!"
            }
            setTimeout(() => {
                feedbackMessage.value = null
            }, 5000)
        }

        return {
            username,
            login,
            password,
            registerUser,
            feedbackMessage,
            feedbackType,
            feedbackTitle
        }
    }
}

</script>

<style scoped>
    main {
        display: flex;
        flex-direction: column;
        gap: 10px;
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

    .form-section {
        padding: 16px;
    }

    .titles {
        display: flex;
        flex-direction: column;
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

    .feedback {
        width: 370px;
    }
</style>