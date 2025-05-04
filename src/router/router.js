import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "inicio",
      component: () => import("@/layouts/PublicLayout.vue"),
      children: [
        {
          path: 'inicio',
          component: () => import("@/views/Inicio.vue")
        },
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