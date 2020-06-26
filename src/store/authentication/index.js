import actions from './actions';

export default {
  namespaced: true,
  state: {
    user: undefined,
  },
  mutations: {
    setUser: (state, value) => { state.user = value; },
  },
  actions,
  getters: {
    isUserLoggedIn: state => !(state.user == null),
  },
};
