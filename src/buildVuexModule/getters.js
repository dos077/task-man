export default () => ({
  getById: state => id => state.items.find(i => i.id === id),
});
