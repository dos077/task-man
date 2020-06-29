export default () => ({
  set: (state, items) => {
    state.items = items;
  },

  add: (state, item) => {
    if (state.items) state.items.push(item);
    else state.items = [item];
  },

  setCurrent: (state, item) => { state.current = item; },

  setCreationPending: (state, status) => { state.creationPending = status; },

  setName: (state, name) => { state.collectionName = name; },

  setColor: (state, color) => { state.color = color; },
});
