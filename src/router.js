import Vue from 'vue';
import Router from 'vue-router';
import Project from './views/Project.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/project/:pid',
      name: 'project',
      component: Project,
    },
    {
      path: '/browse',
      name: 'browse',
      component: Home,
    },
  ],
});
