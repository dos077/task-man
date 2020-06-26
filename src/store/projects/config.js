import CollectionDB from '@/firebase/firestore/projectsDB';

const loadCollectionDB = ({ rootState }) => {
  const userId = rootState.authentication.user.id;
  return new CollectionDB(userId);
};

export default { loadCollectionDB };
