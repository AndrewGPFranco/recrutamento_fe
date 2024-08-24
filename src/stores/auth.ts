import type { User } from "@/interfaces/User";
import { api } from "@/network/axiosInstance";
import router from "@/router";
import { jwtDecode, type JwtPayload } from "jwt-decode";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem('token') != null ? localStorage.getItem('token') : "",
        status: 0,
        user: {
            username: "",
            login: ""
        }
    }),
    actions: {
        setToken(token: string) {
            this.token = token
        },
        setStatus(status: number) {
            this.status = status
        },
        setUser(user: Partial<User>) {
            if(user.username && user.login) {
                this.user.username = user.username,
                this.user.login = user.login
            } 
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
                    const token = response.data.token
                    localStorage.setItem("token", token)
                    this.getUserData(token)
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
        },
        async getUserData(token: string) {
            const tokenDecode: JwtPayload = jwtDecode(token)
            const username = tokenDecode.username
            const login = tokenDecode.login
            const user = {
                username,
                login
            }
            this.setUser(user)
            console.log(tokenDecode)
        }
    },
    getters: {
        getToken: (state) => {
            return state.token
        },
        getStatus: (state) => {
            return state.status
        },
        getUser: (state) => {
            return state.user
        }
    },
})