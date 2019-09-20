import MakeNote from './MakeNote';

const MakeList = ({
  id, title, notes, nextNote,
}) => {
  const list = {
    id,
    title: title || 'New List',
    notes: notes || [],
    nextNote: nextNote || 1,
    newNote() {
      const nextId = `${this.id}-${this.nextNote}`;
      const note = MakeNote(nextId, this.id);
      this.notes.push(note);
      this.nextNote += 1;
      return note;
    },
    delNote(noteId) {
      const index = this.notes.findIndex(n => n.id === noteId);
      return this.notes.splice(index, 1)[0];
    },
    save() {
      return {
        id: this.id,
        title: this.title,
        notes: this.notes,
        nextNote: this.nextNote,
      };
    },
  };

  return list;
};

export default MakeList;
