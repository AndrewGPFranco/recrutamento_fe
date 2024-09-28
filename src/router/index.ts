import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterUser from '@/views/Auth/RegisterUser.vue'
import Login from '@/views/Auth/LoginView.vue'
import JobView from '@/views/Vacancy/JobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth/user/register',
      name: 'register-user',
      component: RegisterUser
    },
    {
      path: '/auth/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/job',
      name: 'job',
      component: JobView
    }
  ]
})

export default router
