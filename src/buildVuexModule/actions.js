let distachListener = null;

export default ({ loadCollectionDB }) => ({
  getAll: async ({ rootState, commit }) => {
    const collectionDB = loadCollectionDB({ rootState });

    const items = await collectionDB.readAll();
    commit('set', items);
  },

  read: async ({ rootState, commit }, id) => {
    commit('setCreationPending', true);
    const collectionDB = loadCollectionDB({ rootState });

    const item = await collectionDB.read(id);
    commit('setCurrent', item);
    commit('setCreationPending', false);
  },

  create: async ({ rootState, commit }, item) => {
    const collectionDB = loadCollectionDB({ rootState });

    commit('setCreationPending', true);
    const created = await collectionDB.create(item);
    commit('add', created);
    commit('setCurrent', created);
    commit('setCreationPending', false);
  },

  rename: async ({ rootState, state, commit }, { name }) => {
    if (!name || typeof name !== 'string') throw Error('Name is not a string');
    const srr = name.match(/[\w\s]/g);
    if (srr.length > 11) throw Error('Name too long');

    const newMeta = { name: srr.join(''), color: state.color };
    const collectionDB = loadCollectionDB({ rootState });
    await collectionDB.updateMeta(newMeta);
    commit('setName', name);
  },

  readMeta: async ({ rootState, commit }) => {
    const collectionDB = loadCollectionDB({ rootState });
    const meta = await collectionDB.getMeta();
    if (meta) {
      if (meta.name) commit('setName', meta.name);
      if (meta.color) commit('setColor', meta.color);
    }
  },

  update: async ({ rootState, commit }, item) => {
    const collectionDB = loadCollectionDB({ rootState });

    commit('addUpdatePending', item.id);
    const updated = await collectionDB.update(item);
    commit('update', updated);
    commit('removeUpdatePending', item.id);
  },

  delete: async ({ rootState, commit, getters }, id) => {
    if (getters.isDeletionPending(id)) return;

    const collectionDB = loadCollectionDB({ rootState });

    commit('addDeletionPending', id);
    await collectionDB.remove(id);
    commit('removeById', id);
    commit('removeDeletionPending', id);
  },

  listenAll: async ({
    rootState, getters, state, commit,
  }) => {
    if (!distachListener) {
      const collectionDB = loadCollectionDB({ rootState });

      const callBack = (items) => {
        if (state.items && !getters.syncPending() && (
          items.length !== state.items.length
          || items.some((item) => {
            const refIndex = state.items.findIndex(ref => ref.id === item.id);
            if (refIndex < 0) return true;
            if (item.updateTimestamp.getTime() > state.items[refIndex].updateTimestamp.getTime()) {
              return true;
            }
            return false;
          })
        )) {
          commit('set', items);
        }
      };
      distachListener = await collectionDB.listenAll(null, callBack);
    }
  },

  stopListen: () => {
    if (distachListener) {
      distachListener();
      distachListener = null;
    }
  },
});
