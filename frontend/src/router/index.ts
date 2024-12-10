import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/homepage/HomeView.vue'
import LoginView from '@/views/auth/loginSignup/LoginView.vue'
import SignupView from '@/views/auth/loginSignup/SignupView.vue'
import {useAuthStore} from "@/stores/authStore";
import {fetchStatus} from "@/api/auth";
import NotFoundView from "@/views/NotFoundView.vue";
import {useUserTargetStore} from "@/stores/userTargetStore";

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
        redirectProfileIfConnected: true
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      meta: {
        redirectProfileIfConnected: true
      },
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('@/views/auth/forgotPassword/ForgotPasswordView.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/views/auth/forgotPassword/ResetPassword.vue'),
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: () => import('@/views/auth/mail/VerifyEmailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/mail-verify-email',
      name: 'mail-verify-email',
      component: () => import('@/views/auth/mail/MailPageVerificationEmail.vue')
    },
    {
      path: '/profile',
      name: 'private-profile',
      component: () => import('../views/user/profile/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/edit',
      name: 'edit-profile',
      component: () => import('@/views/user/settings/EditProfileView.vue'),
        meta: { requiresAuth: true },
    },
    {
      path: '/profile/preferences',
      name: 'preferences',
      component: () => import('@/views/user/settings/PreferencesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile/settings',
      name: 'settings',
      component: () => import('@/views/user/settings/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chat/',
      name: 'home-chat',
      component: () => import('@/views/user/chat/HomeChatView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: () => import('@/views/user/chat/ChatView.vue'),
      meta: { requiresAuth: true, hideHeader: true },
    },
    {
      path: '/profile/:id',
      name: 'public-profile',
      component: () => import('@/views/homepage/HomeProfileView.vue'),
      meta: { hideHeader: true },
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter: () => {
        const authStore = useAuthStore();
        authStore.logout();
      },
      redirect() {
        return {name: 'home'}
      },
    },
    {
      path: '/profile/edit',
      name: 'create-profile',
      component: () => import('@/views/auth/createProfile/CreateProfileView.vue'),
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

router.beforeResolve(async (to, from, next) => {
  if (from.name === "home" && to.name !== "public-profile") {
    const useTargetStore = useUserTargetStore();
    useTargetStore.reset();
  }
  next();
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
  // if (_.isEmpty(authStore.user)) {
  const {user} = await tryToFetch();
  if (user) authStore.storeUserInfo(user);
  // }
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
