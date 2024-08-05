import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import {useAuthStore} from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/auth/ForgotPasswordView.vue')
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('../views/auth/VerifyEmailView.vue')
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('../views/CreateProfileView.vue'),
      // beforeEnter: (to, from, next) => {
      //   const authStore = useAuthStore();
      //     if (authStore.isLoggedIn)
      //       next()
      //     else
      //       next({ name: 'login' })
      // }
    }
  ]
})

export default router
