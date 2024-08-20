import type { User } from "@/interfaces/User";
import { api } from "@/network/axiosInstance";
import router from "@/router";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem('token') != null ? localStorage.getItem('token') : "",
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
                    console.log(response.data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        },
        logout() {
            localStorage.removeItem('token')
            this.token = ""
            this.status = 0
            router.push({name: 'login'})
        }
    },
    getters: {
        getToken: (state) => {
            return state.token
        },
        getStatus: (state) => {
            return state.status
        }
    },
})