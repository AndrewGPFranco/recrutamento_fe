import type { User } from "@/interfaces/User";
import { api } from "@/network/axiosInstance";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: "",
        user: {
            username: "",
            login: ""
        }
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        async register(username: string, login: string, password: string) {
            const data: User = {
                username, 
                login, 
                password
            }
            await api.post("/auth/register", data)
                .then((response) => {
                    this.user.username = response.data.username
                    this.user.login = response.data.login
                    return response
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    },
    getters: {
        getToken: (state) => {
            return state.token
        },
        getUser: (state) => {
            return state.user
        }
    },
})