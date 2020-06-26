import CollectionDB from '@/firebase/firestore/listsDB';

const loadCollectionDB = ({ rootState }) => {
  const userId = rootState.authentication.user.id;
  const projectId = rootState.projects.current.id;
  return new CollectionDB(userId, projectId);
};

export default { loadCollectionDB };
