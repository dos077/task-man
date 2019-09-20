import MakeNote from '@/dataLogic/MakeNote';

describe('MakeNote', () => {
  const listId = 2;
  const note = MakeNote(0, listId);
  it('returns a note object with board and row', () => {
    expect(note.id).toBe(0);
    expect(note.listId).toBe(2);
  });

  it('saves the body and color', () => {
    expect(note.color).toBe(0);
    note.body = 'hello';
    note.color = 1;
    expect(note.body).toBe('hello');
    expect(note.color).toBe(1);
  });
});
