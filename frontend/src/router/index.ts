import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import {useAuthStore} from "@/stores/userStore";
import {fetchMe, fetchStatus} from "@/api/auth";
import {useRouter} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.email) {
          console.log("redirect to profile");
          return next({name: 'profile'})
        }
        return next();
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();

        if (authStore.email) {
          console.log("redirect to profile");
          return next({name: 'profile'})
        }
        return next();
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/ForgotPasswordView.vue')
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('@/views/auth/VerifyEmailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mail-verify-email',
      name: 'mail-verify-email',
      component: () => import('@/views/auth/MailPageVerificationEmail.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/user/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('@/views/user/CreateProfileView.vue'),
      meta: { requiresAuth: true },
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  try {
    const userInfo = await fetchStatus();
    const {connected, user} = userInfo;

    console.log('User info', userInfo);
    if (user) authStore.storeUserInfo(user);
    if (to.meta.requiresAuth) {
        if (!connected && to.name !== 'login') {
          return next({name: 'login'})
        }
        else if (!user.verify_email) {
          if (to.name !== 'verify-email')
            return next({name: 'verify-email'})
          else
            return next();
        }
        else if (!user.create_profile) {
          if (to.name !== 'create-profile')
            return next({name: 'create-profile'})
          else
            return next();
        }
        return next();
    }
  } catch (error) {
    return next()
  }
  return next()
})
export default router
