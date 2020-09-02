import BuildProject from '@/template/project';
import BuildNote from '@/template/note';

const demoProject = BuildProject();
demoProject.id = 'demo';
demoProject.title = 'Demo Project';

const note = BuildNote();
note.id = Date.now();
note.title = 'Welcome to Task-man';
note.body = 'Click on me to edit';
note.color = 3;

export default {
  namespaced: true,
  state: { project: demoProject, notes: [note], on: false },
  mutations: {
    turnOn: (state) => { state.on = true; },
    turnOff: (state) => { state.on = false; },
    updateProject: (state, item) => { state.project = item; },
    createNote: (state, item) => {
      state.notes.push({ id: Date.now(), ...item });
    },
    updateNote: (state, item) => {
      if (!state.notes || state.notes.length === 0) {
        throw Error('no notes in state');
      }
      const noteIndex = state.notes.findIndex(n => n.id === item.id);
      if (noteIndex < 0) throw Error('Trying to update nonexisting note');
      const updatedNotes = [...state.notes];
      updatedNotes[noteIndex] = item;
      state.notes = updatedNotes;
    },
    delNote: (state, id) => {
      const updatedNotes = state.notes.filter(n => n.id !== id);
      state.notes = [];
      state.notes = updatedNotes;
    },
  },
};
