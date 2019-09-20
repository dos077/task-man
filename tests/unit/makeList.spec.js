import MakeList from '@/dataLogic/MakeList';

describe('list factory', () => {
  const list = MakeList({ id: 2 });

  it('creates a list with id', () => {
    expect(list.id).toBe(2);
  });
  it('creates a list with title', () => {
    expect(list.title).toBe('New List');

    list.title = 'test title';

    expect(list.title).toBe('test title');
  });
  it('can create and delete note', () => {
    expect(list.notes.length).toBe(0);
    expect(list.nextNote).toBe(1);

    list.newNote();
    list.newNote();

    expect(list.notes.length).toBe(2);
    expect(list.notes[0].id).toBe('2-1');
    expect(list.nextNote).toBe(3);

    list.delNote('2-1');
    expect(list.notes.length).toBe(1);
    expect(list.notes[0].id).toBe('2-2');
  });
  it('can dump data for saving', () => {
    const dump = list.save();
    Object.keys(dump).forEach((key) => {
      expect(dump[key]).toBe(list[key]);
    });
  });
});
