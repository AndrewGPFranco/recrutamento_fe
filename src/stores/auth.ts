import type { User } from "@/interfaces/User";
import { api } from "@/network/axiosInstance";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: "",
        user: {
            username: "",
            login: ""
        },
        status: 0
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setStatus(status: number) {
            this.status = status
        },
        async register(username: string, login: string, password: string) {
            this.setStatus(0)
            const data: User = {
                username, 
                login, 
                password
            }
            await api.post("/auth/register", data)
                .then((response) => {
                    this.user.username = response.data.username
                    this.user.login = response.data.login
                    this.setStatus(response.status)
                    return response
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        async login(login: string, password: string) {
            const data = {
                login,
                password
            }

            await api.post("/auth/login", data)
                .then((response) => {
                    this.setToken(response.data.token)
                    this.setStatus(response.status)
                    localStorage.setItem("token", response.data.token)
                })
                .catch((error)=>{
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
        },
        getStatus: (state) => {
            return state.status
        }
    },
})