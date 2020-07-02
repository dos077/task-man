export default () => ({
  isDeletionPending: state => id => state.deletionPending.includes(id),

  getById: state => id => state.items.find(i => i.id === id),

  syncPending: state => () => state.creationPending
    || state.deletionPending.length > 0
    || state.updatePending.length > 0,
});
