export default () => ({
  isDeletionPending: state => id => state.deletionPending.includes(id),

  getById: state => id => state.items.find(i => i.id === id),
});
