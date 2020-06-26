import UsersDB from '@/firebase/firestore/usersDB';

const newUserFromFirebaseAuth = async (firebaseAuthUser) => {
  const providerData = firebaseAuthUser.providerData[0];
  const { displayName, photoURL, email } = providerData;
  const userDb = UsersDB();
  const user = {
    displayName,
    photoURL,
    email,
  };

  return userDb.create(user, firebaseAuthUser.uid);
};

export default {
  login: async ({ commit }, firebaseAuthUser) => {
    const userFromFirebase = await UsersDB().read(firebaseAuthUser.uid);

    const user = userFromFirebase == null
      ? await newUserFromFirebaseAuth(firebaseAuthUser)
      : userFromFirebase;

    commit('setUser', user);
  },

  logout: ({ commit }) => {
    commit('setUser', null);
  },
};
