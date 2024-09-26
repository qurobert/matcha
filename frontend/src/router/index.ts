import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import {useAuthStore} from "@/stores/userStore";
import {fetchStatus} from "@/api/auth";
import NotFoundView from "@/views/NotFoundView.vue";

const redirectToProfile = async (to: any, from: any, next: any) => {
  const authStore = useAuthStore();

  console.log(authStore.verify_email);
  if (authStore.email && authStore.verify_email) {
    console.log("redirect to profile");
    return next({name: 'private-profile'})
  }
  return next();
}

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
      meta: {hideHeaderInfo: true},
      beforeEnter: redirectToProfile
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {hideHeaderInfo: true},
      beforeEnter: redirectToProfile
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: {hideHeaderInfo: true},
      component: () => import('@/views/auth/forgot-password/ForgotPasswordView.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/auth/forgot-password/ResetPassword.vue'),
      meta: {hideHeaderInfo: true}
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('@/views/auth/VerifyEmailView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/mail-verify-email',
      name: 'mail-verify-email',
      component: () => import('@/views/auth/MailPageVerificationEmail.vue')
    },
    {
      path: '/profile',
      name: 'private-profile',
      component: () => import('../views/user/ProfileView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: () => import('@/views/user/EditProfileView.vue'),
    //     meta: { requiresAuth: true },
    },
    {
      path: '/profile/preferences',
      name: 'preferences',
      component: () => import('@/views/user/PreferencesView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/profile/settings',
      name: 'settings',
      component: () => import('@/views/user/SettingsView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/views/user/ChatView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/profile/:id',
      name: 'public-profile',
      component: () => import('@/views/user/UserProfileView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        authStore.logout();
      },
      redirect(to) {
        return {name: 'home'}
      },
    },
    {
      path: '/create-profile',
      name: 'create-profile',
      component: () => import('@/views/user/CreateProfileView.vue'),
      // meta: { requiresAuth: true },
    },
    {
      path: '/:catchAll(.*)', // Capture toutes les routes non définies
      name: 'NotFound',
      component: NotFoundView,
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  try {
    const { connected, user } = await fetchStatus();

    if (user) authStore.storeUserInfo(user);
    if (to.name === 'create-profile' && user.first_name) {
      return next({name: 'private-profile'})
    }
    if (to.meta.requiresAuth) {
      console.log("VERIFY EMAIL: ", authStore.verify_email);
        if (!connected && to.name !== 'login') {
          return next({name: 'login'})
        }
        else if (!user.verify_email) {
          if (to.name !== 'verify-email')
            return next({name: 'verify-email'})
          else
            return next();
        }
        else if (!user.first_name) {
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
