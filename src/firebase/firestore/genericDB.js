import firebase from 'firebase/app';
import loadFirestore from './loadFirestore';

const convertObjectTimestampPropertiesToDate = (obj) => {
  const newObj = {};

  Object.keys(obj)
    .filter(prop => obj[prop] instanceof Object)
    .forEach((prop) => {
      if (obj[prop] instanceof firebase.firestore.Timestamp) {
        const convertedDate = obj[prop].toDate();
        newObj[prop] = convertedDate;
      } else {
        convertObjectTimestampPropertiesToDate(obj[prop]);
      }
    });

  return {
    ...obj,
    ...newObj,
  };
};

export default (collectionPath) => {
  const create = async (data, id = null) => {
    const collectionRef = (await loadFirestore()).collection(collectionPath);
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();

    const dataToCreate = {
      ...data,
      createTimestamp: serverTimestamp,
      updateTimestamp: serverTimestamp,
    };

    const createPromise = id == null
      ? collectionRef.add(dataToCreate).then(doc => doc.id)
      : collectionRef
        .doc(id)
        .set(dataToCreate)
        .then(() => id);

    const docId = await createPromise;

    return {
      id: docId,
      ...data,
      createTimestamp: new Date(),
      updateTimestamp: new Date(),
    };
  };

  const getMeta = async () => {
    const res = await (await loadFirestore())
      .collection(collectionPath)
      .doc('meta')
      .get();
    const data = res.exists ? res.data() : null;
    return data;
  };

  const updateMeta = async (newMeta) => {
    await (await loadFirestore())
      .collection(collectionPath)
      .doc('meta')
      .set(newMeta);
  };

  const read = async (id) => {
    const res = await (await loadFirestore())
      .collection(collectionPath)
      .doc(id)
      .get();

    const data = res.exists ? res.data() : null;

    if (data == null) return null;

    convertObjectTimestampPropertiesToDate(data);
    return { id, ...data };
  };

  const readAll = async (constraints = null) => {
    const collectionRef = (await loadFirestore()).collection(collectionPath);
    let query = collectionRef;

    if (constraints) {
      constraints.forEach((constraint) => {
        query = query.where(...constraint);
      });
    }

    const formatResult = res => res.docs.map(ref => convertObjectTimestampPropertiesToDate({
      id: ref.id,
      ...ref.data(),
    }));

    return formatResult(await query.get()).filter(({ id }) => id !== 'meta');
  };

  const listenAll = async (constraints = null, callBack) => {
    const collectionRef = (await loadFirestore()).collection(collectionPath);
    let query = collectionRef;

    if (constraints) {
      constraints.forEach((constraint) => {
        query = query.where(...constraint);
      });
    }

    return query.onSnapshot((res) => {
      const formResult = res.docs.map(ref => convertObjectTimestampPropertiesToDate({
        id: ref.id,
        ...ref.data(),
      }));
      callBack(formResult);
    });
  };

  const update = async (data) => {
    const { id } = data;
    const clonedData = { ...data };
    delete clonedData.id;

    const updateTimestamp = firebase.firestore.FieldValue.serverTimestamp();

    await (await loadFirestore())
      .collection(collectionPath)
      .doc(id)
      .update({
        ...clonedData,
        updateTimestamp,
      });

    return {
      id,
      ...clonedData,
      updateTimestamp: new Date(),
    };
  };

  const remove = async id => (await loadFirestore())
    .collection(collectionPath)
    .doc(id)
    .delete();

  return {
    create, getMeta, updateMeta, read, readAll, update, remove, listenAll,
  };
};
