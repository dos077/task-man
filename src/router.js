import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Project from './views/Project.vue';
import Projects from './views/Projects.vue';
import Home from './views/Home.vue';
import CheckLogin from './views/CheckLogin.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { authNotRequired: true },
      beforeEnter: (to, from, next) => {
        if (store.state.authentication.user !== null) next('/projects');
        else next();
      },
    },
    {
      path: '/check-login',
      name: 'check-login',
      component: CheckLogin,
      meta: { authNotRequired: true },
    },
    {
      path: '/login',
      component: Login,
      meta: { authNotRequired: true },
    },
    {
      path: '/projects',
      component: Projects,
    },
    {
      path: '/project/:pid',
      name: 'project',
      component: Project,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (
    !(to.meta && to.meta.authNotRequired)
    && store.state.authentication.user == null
  ) {
    const path = store.state.authentication.user === null ? '/login' : '/check-login';
    next(`${path}?redirectUrl=${to.path}`);
  } else {
    next();
  }
});

export default router;
