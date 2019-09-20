import MakeProject from '@/dataLogic/MakeProject';

describe('project factory', () => {
  let project = MakeProject({});
  it('creates blank project', () => {
    expect(project.title).toBe('New Project');
  });
  it('creates a project with title', () => {
    project = MakeProject({ title: 'testing' });

    expect(project.title).toBe('testing');
    expect(project.lists.length).toBe(1);
    expect(project.lists[0].title).toBe('New List');
  });
  it('creates new list', () => {
    project.newList();
    expect(project.lists.length).toBe(2);
  });
  it('moves notes from one list to another', () => {
    const origin = project.newList();
    const target = project.lists[0];
    const note = origin.newNote();
    expect(note.listId).toBe(origin.id);
    expect(origin.notes.length).toBe(1);
    expect(target.notes.length).toBe(0);
    project.moveNote(note, target.id);
    expect(origin.notes.length).toBe(0);
    expect(target.notes.length).toBe(1);
    expect(note.listId).toBe(target.id);
  });
  it('moves done note to the next list', () => {
    const origin = project.lists[project.lists.length - 1];
    const target = project.newList();
    const note = origin.newNote();
    expect(note.listId).toBe(origin.id);
    expect(target.notes.length).toBe(0);
    project.noteDone(note);
    expect(note.listId).toBe(target.id);
    expect(target.notes.length).toBe(1);
    expect(target.notes[0].id).toBe(note.id);
    project.noteDone(note, -1);
    expect(note.listId).toBe(origin.id);
    expect(target.notes.length).toBe(0);
    expect(origin.notes[origin.notes.length - 1].id).toBe(note.id);
  });
  it('trims off empty lists from the end', () => {
    const numLists = project.lists.length;
    const lastList = project.newList();
    const note = lastList.newNote();
    expect(project.lists.length).toBe(numLists + 1);
    project.noteDone(note, -1);
    expect(project.lists.length).toBe(numLists);
    const last2 = project.newList();
    const note2 = last2.newNote();
    expect(project.lists.length).toBe(numLists + 1);
    last2.delNote(note2.id);
    project.trimLists();
    expect(project.lists.length).toBe(numLists);
  });
});
