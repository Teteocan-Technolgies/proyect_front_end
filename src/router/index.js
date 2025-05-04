import { createRouter, createMemoryHistory } from "vue-router";

export const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/PublicLayout.vue"),
      children: [
        {
          path: 'login',
          component: () => import("@/components/inicio/Login.vue")
        },
        {
          path: 'register',
          component: () => import("@/components/inicio/Register.vue")
        },
        {
          path: '',
          redirect: '/login'
        }
      ]
    },
  ]
});


router.beforeEach((to, from, next) => {
  if (to.name === 'inicio' && localStorage.getItem('token') === null) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;