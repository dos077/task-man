import Vue from 'vue';
import Vuex from 'vuex';
import projects from './projects';
import notes from './notes';
import app from './app';
import authentication from './authentication';
import draggable from './draggable';
import demo from './demo';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app,
    authentication,
    projects,
    notes,
    draggable,
    demo,
  },
});
