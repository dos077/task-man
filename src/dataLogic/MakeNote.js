const MakeNote = (id, listId) => {
  const note = {
    id,
    listId,
    title: 'New Task',
    body: '',
    color: 0,
    due: null,
  };

  return note;
};

export default MakeNote;
