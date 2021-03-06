import buildState from './state';
import buildMutations from './mutations';
import buildActions from './actions';
import buildGetters from './getters';

export default config => ({
  state: buildState(),
  mutations: buildMutations(),
  actions: config ? buildActions(config) : {},
  getters: buildGetters(),
});
