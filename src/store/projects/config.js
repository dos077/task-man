import CollectionDB from '@/firebase/firestore/projectsDB';

const loadCollectionDB = ({ rootState }) => {
  const userId = rootState.authentication.user.id;
  return CollectionDB(userId);
};

export default { loadCollectionDB };
