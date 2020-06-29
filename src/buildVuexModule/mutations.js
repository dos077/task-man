export default () => ({
  set: (state, items) => {
    state.items = items;
  },

  setCurrent: (state, item) => { state.current = item; },

  setName: (state, name) => { state.collectionName = name; },

  setColor: (state, color) => { state.color = color; },

  add: (state, item) => state.items.push(item),

  update: (state, item) => {
    if (state.items && state.items.length > 0) {
      const index = state.items.findIndex(e => e.id === item.id);
      if (index > -1) state.items[index] = item;
    }
    if (state.current && state.current.id === item.id) state.current = item;
  },

  removeById: (state, id) => {
    const index = state.items.findIndex(i => i.id === id);
    state.items.splice(index, 1);
  },

  addUpdatePending: (state, id) => state.updatePending.push(id),

  removeUpdatePending: (state, id) => {
    state.updatePending = state.updatePending.filter(i => i !== id);
  },

  addDeletionPending: (state, id) => state.deletionPending.push(id),

  removeDeletionPending: (state, id) => {
    state.deletionPending = state.deletionPending.filter(i => i !== id);
  },

  setCreationPending: (state, value) => {
    state.creationPending = value;
  },

});
