// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store/app';

// Components
import DefaultLayout from '@/layouts/default/Default.vue'
import Home from '@/views/Home.vue'
import Second from '@/views/TestSecond.vue'

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
          inactiveIcon: 'mdi-home-outline',
          activeIcon: 'mdi-home'
        }
      },
      {
        path: 'second',
        name: 'Second',
        component: Second,
        meta: {
          isMenuItem: true,
          inactiveIcon: 'mdi-flask-empty-outline',
          activeIcon: 'mdi-flask-empty'
        }
      },
    ],
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
  const app = useAppStore();

  // pages that won't redirect to login, if unauthenticated
  const ignoreList = [
    "Login",
    "Register",
    "Error",
  ]

  if (
    // make sure the user is authenticated
    !app.isAuthenticated &&
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
