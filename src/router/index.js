import { createRouter, createMemoryHistory } from "vue-router";

export const router = createRouter({
  history: createMemoryHistory(import.meta.env.BASE_URL || '/'),
  routes: [
    {
      path: "/",
      component: () => import("@/layouts/PublicLayout.vue"),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import("@/components/inicio/Login.vue")
        },
        {
          path: 'register',
          name: 'register',
          component: () => import("@/components/inicio/Register.vue")
        },
        {
          path: '',
          redirect: { name: 'login' }
        }
      ],
    },

    {
      path: "/inicio",
      name: 'inicio',
      component: () => import("@/layouts/UsuarioLayout.vue"),
      children: [
        {
          path: '/inicio/productos',
          name: 'productos',
          component: () => import("@/components/productos/AllProducts.vue")
        },
        {
          path: '/inicio/ventas',
          name: 'ventas',
          component: () => import("@/components/ventas/AllVentas.vue")
        },
        {
          path: '/inicio/usuarios',
          name: 'Usuarios',
          component: () => import("@/components/usuario/AllUsers.vue")
        },
      ]
    },
  ]
});


router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');

  if (user && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'inicio' });
  } else if (!user && to.name === 'inicio') {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;