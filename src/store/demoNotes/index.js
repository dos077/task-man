import buildVuexModule from '@/buildVuexModule';

const { state, mutations, getters } = buildVuexModule();

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
