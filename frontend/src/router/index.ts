import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import SignupView from '@/views/auth/SignupView.vue'
import {useAuthStore} from "@/stores/userStore";
import {fetchStatus} from "@/api/auth";
import NotFoundView from "@/views/NotFoundView.vue";
import _ from 'lodash';

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
      meta: {
        hideHeaderInfo: true,
        redirectProfileIfConnected: true
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        hideHeaderInfo: true,
        redirectProfileIfConnected: true
      },
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
      meta: { requiresAuth: true },
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
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: () => import('@/views/user/EditProfileView.vue'),
        meta: { requiresAuth: true },
    },
    {
      path: '/profile/preferences',
      name: 'preferences',
      component: () => import('@/views/user/PreferencesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/settings',
      name: 'settings',
      component: () => import('@/views/user/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/views/user/ChatView.vue'),
      meta: { requiresAuth: true },
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
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:catchAll(.*)', // Capture toutes les routes non définies
      name: 'NotFound',
      component: NotFoundView,
    },
  ]
})


// Before each
router.beforeEach(async (to, from, next) => {

  await storeUserInfoIfEmpty()
  if (to.meta.redirectProfileIfConnected)
    return redirectProfileIfConnected(to, from, next)
  else if (to.meta.requiresAuth)
    return redirectionModeAuth(to, from, next)
  return next();
})

async function storeUserInfoIfEmpty() {
  const authStore = useAuthStore();
  if (_.isEmpty(authStore.user)) {
    const {user} = await tryToFetch();
    if (user) authStore.storeUserInfo(user);
  }
}

async function tryToFetch() {
  try {
    const status = await fetchStatus();
    if (status.token_expired)
      return await fetchStatus();
    return status;
  } catch (error) {
    return {connected: false, user: null};
  }
}
function redirectionModeAuth(to: any, from: any, next: any) {
  const authStore = useAuthStore();

  if (!authStore.is_connected)
    return nextWithInfiniteLoopProtection('login', next, to)
  else if (!authStore.user.verify_email)
    return nextWithInfiniteLoopProtection('verify-email', next, to)
  else if (!authStore.user.first_name)
    return nextWithInfiniteLoopProtection('create-profile', next, to)
  return next();
}

function nextWithInfiniteLoopProtection(path: string, next: any, to: any) {
  if (to.name === path) return next();
  return next({name: path})
}

// Utility functions

function redirectProfileIfConnected(to: any, from: any, next: any) {

  return next();
}
export default router
