import buildVuexModule from '@/buildVuexModule';
import config from './config';

const sortByUpdate = (a, b) => {
  const aTime = new Date(a.updateTimestamp);
  const bTime = new Date(b.updateTimestamp);
  return bTime - aTime;
};

const {
  state, mutations, getters, actions,
} = buildVuexModule(config);

const projectsMutations = {
  ...mutations,
  sort: (s) => {
    s.items.sort(sortByUpdate);
  },
};

const projectActions = {
  ...actions,
  getAll: async (context) => {
    await actions.getAll(context);
    context.commit('sort');
  },
  create: async (context, item) => {
    await actions.create(context, item);
    context.commit('sort');
  },
  update: async (context, item) => {
    await actions.update(context, item);
    context.commit('sort');
  },
};

export default {
  namespaced: true,
  state,
  mutations: projectsMutations,
  getters,
  actions: projectActions,
};
