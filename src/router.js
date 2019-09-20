import Vue from 'vue';
import Router from 'vue-router';
import Project from './views/Project.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Project,
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('./views/Project.vue'),
    },
  ],
});
