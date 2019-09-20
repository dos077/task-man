import MakeList from './MakeList';

const MakeProject = ({
  title, created, nextList, lists,
}) => {
  const data = {
    title: title || 'New Project',
    created: created || Date.now(),
    lists: (lists) ? lists.map(l => MakeList(l)) : [MakeList({ id: 1 })],
    nextList: nextList || 2,
  };
  const newList = () => {
    const list = MakeList({ id: data.nextList });
    data.lists.push(list);
    data.nextList += 1;
    return list;
  };

  const findList = lId => data.lists.find(l => l.id === lId);

  const trimLists = () => {
    while (data.lists.length > 1
      && data.lists[data.lists.length - 1].notes.length === 0
    ) {
      data.lists.pop();
    }
  };

  const moveNote = (note, list) => {
    const takenNote = findList(note.listId).delNote(note.id);
    const toList = (list) ? findList(list) : newList();
    toList.notes.push(takenNote);
    takenNote.listId = toList.id;
    trimLists();
  };

  const noteDone = (note, direction = 1) => {
    const dataIndex = data.lists.findIndex(l => l.id === note.listId);
    let nextIndex = dataIndex + direction;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= data.lists.length) newList();
    moveNote(note, data.lists[nextIndex].id);
  };

  function save() {
    return {
      title: data.title,
      created: data.created,
      nextList: data.nextList,
      lists: data.lists.map(l => l.save()),
    };
  }

  return {
    title: data.title,
    created: data.created,
    lists: data.lists,
    nextList: data.nextList,
    newList,
    trimLists,
    findList,
    moveNote,
    noteDone,
    save,
  };
};

export default MakeProject;
