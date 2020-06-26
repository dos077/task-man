import buildVuexModule from '@/buildVuexModule';
import config from './config';

const {
  state, mutations, getters, actions,
} = buildVuexModule(config);

state.collectionName = 'Projects';

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
