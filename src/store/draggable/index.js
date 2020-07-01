export default {
  namespaced: true,
  state: {
    source: null,
    target: null,
    dragOn: false,
  },
  mutations: {
    dragStart: (state, source) => {
      state.source = source;
      state.dragOn = true;
    },
    dragOver: (state, target) => {
      state.target = target;
    },
    dragEnd: (state) => {
      state.dragOn = false;
      state.source = null;
      state.target = null;
    },
  },
};
