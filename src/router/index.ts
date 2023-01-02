// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/store/auth';

// Components
import DefaultLayout from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import Profile from '@/views/UserProfile.vue'
import ApiKeys from '@/views/ApiKeys.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        meta: {
          isMenuItem: true,
          order: 1,
          inactiveIcon: 'mdi-home-outline',
          activeIcon: 'mdi-home'
        }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
        meta: {
          isMenuItem: true,
          order: 2,
          inactiveIcon: 'mdi-account-outline',
          activeIcon: 'mdi-account'
        }
      },
    ],
  },
  {
    path: '/apikey/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Api Keys',
        component: ApiKeys,
        meta: {
          isMenuItem: true,
          order: 3,
          inactiveIcon: 'mdi-key-outline',
          activeIcon: 'mdi-key'
        }
      }
    ]
  },
  {
    path: '/auth/',
    component: () => import('@/layouts/auth/Default.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */'@/views/Login.vue'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */'@/views/Register.vue'),
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})


router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();

  // pages that won't redirect to login, if unauthenticated
  const ignoreList = [
    "Login",
    "Register",
    "Error",
  ]

  if (
    // make sure the user is authenticated
    authStore.token === '' &&
    // ❗️ Avoid an infinite redirect
    !ignoreList.includes(to.name?.toString() ?? "")
  ) {
    // redirect the user to the login page
    return { name: 'Login' }
  }
})

router.resolve({
  name: 'Error',
  params: { pathMatch: ['error'] },
}).href // '/error'

export default router
