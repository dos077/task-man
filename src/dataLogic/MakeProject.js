import MakeList from './MakeList';

const MakeProject = ({
  id, title, created, updated, nextList, lists,
}) => {
  const project = {
    title: title || 'New Project',
    created: created || Date.now(),
    updated: updated || Date.now(),
    lists: (lists) ? lists.map(l => MakeList(l)) : [MakeList({ id: 1 })],
    nextList: nextList || 2,
  };

  project.id = id || `${project.created}-${Math.floor(Math.random() * 1001)}`;

  project.newList = () => {
    const list = MakeList({ id: project.nextList });
    project.lists.push(list);
    project.nextList += 1;
    return list;
  };

  const findList = lId => project.lists.find(l => l.id === lId);

  project.trimLists = () => {
    while (project.lists.length > 1
      && project.lists[project.lists.length - 1].notes.length === 0
    ) {
      project.lists.pop();
    }
  };

  project.moveNote = (note, list) => {
    const takenNote = findList(note.listId).delNote(note.id);
    const toList = (list) ? findList(list) : project.newList();
    toList.notes.push(takenNote);
    takenNote.listId = toList.id;
    project.trimLists();
  };

  project.noteDone = (note, direction = 1) => {
    const projectIndex = project.lists.findIndex(l => l.id === note.listId);
    let nextIndex = projectIndex + direction;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex >= project.lists.length) project.newList();
    project.moveNote(note, project.lists[nextIndex].id);
  };

  project.save = () => {
    const dump = {
      id: project.id,
      title: project.title,
      created: project.created,
      updated: project.updated,
      nextList: project.nextList,
      lists: project.lists.map(l => l.save()),
    };
    return dump;
  };

  return project;
};

export default MakeProject;
