<template>
  <div class="list-container">
    <v-slide-x-transition hide-on-leave>
      <span v-if="!editTitle" class="ttl list-title" @click="editTitle = true">
        {{ listTitle || 'No Title' }}
      </span>
      <v-textarea
        v-if="editTitle"
        autofocus
        class="ttl"
        v-model="newTitle"
        row-height="36"
        style="margin-left: 24px;; font-size: 24px; width: 200px;"
        auto-grow
        rows=1
        flat
        :disabled="loading"
        @blur="saveTitle"
        @keydown="keyDownHandl"
      ></v-textarea>
    </v-slide-x-transition>
    <div class="note-list">
      <div
        v-if="dragSource && dragSource.listIndex !== index"
        class="drag-target"
        :class="{ 'targeted': dragTarget === index }"
        @dragenter="dragOver(index)"
        @dragover="(ev) => { ev.preventDefault(); }"
        @dragleave="dragOver(null)"
        v-on:drop="dropHandle"
      />
      <v-btn
        fab
        absolute
        color="#fafafa"
        small
        elevation="3"
        width="36"
        height="36"
        style="top: -18px; right: -2px;"
        :disabled="loading"
        @click="newNote()"
      >
        <v-icon color="#616161">add</v-icon>
      </v-btn>
      <div v-for="(group, i) in groups" :key="i" class="group">
        <note
          v-for="(note, j) in group" :key="j"
          :note="note"
          @finish-note="$emit('note-done', note)"
          @rewind-note="$emit('note-rewind', note)"
          @new-update="$emit('new-update')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapActions, mapMutations, mapGetters,
} from 'vuex';
import Note from './Note.vue';
import BuildNote from '@/template/note';

const sortByDue = (a, b) => {
  const aDue = (a.due !== null) ? new Date(a.due) : Infinity;
  const bDue = (b.due !== null) ? new Date(b.due) : Infinity;
  return aDue - bDue;
};

export default {
  name: 'List',
  props: ['notes', 'index', 'sort'],
  data() {
    return {
      editTitle: false,
      newTitle: '',
      tempNote: null,
    };
  },
  components: {
    Note,
  },
  computed: {
    ...mapState('projects', { project: 'current' }),
    ...mapState('projects', ['creationgPending', 'updatePending', 'deletionPending']),
    ...mapState('draggable', { dragSource: 'source', dragTarget: 'target' }),
    ...mapGetters('notes', { getNote: 'getById' }),
    ...mapState('demo', { demoProject: 'project', demoNotes: 'notes', demo: 'on' }),
    loading() {
      return this.creationPending
      || this.deletionPending.length > 0
      || this.updatePending.length > 0;
    },
    listTitle() {
      if (this.demo) {
        return this.demoProject
          ? this.demoProject.lists[this.index]
          : '';
      }
      return this.project.lists[this.index];
    },
    displayNotes() {
      return this.tempNote ? [...this.notes, this.tempNote] : this.notes;
    },
    groups() {
      const sortedNotes = [...this.displayNotes].sort(sortByDue);
      const newIndex = sortedNotes
        .findIndex(n => Date.now() - n.createTimestamp <= 1000);
      const groups = [];
      if (newIndex >= 0) {
        groups.push(sortedNotes.splice(newIndex, 1));
      }
      if (this.sort === 0) {
        groups.push(sortedNotes);
      }
      if (this.sort === 1) {
        [4, 3, 2, 1, 0].forEach((c) => {
          const notes = sortedNotes.filter(n => n.color === c);
          if (notes.length > 0) groups.push(notes);
        });
      }
      return groups;
    },
  },
  watch: {
    listTitle: {
      handler(to) { this.newTitle = to; },
      immediate: true,
    },
    dragTarget(to) {
      if (to !== null && to === this.index) {
        if (this.demo) {
          this.tempNote = this.demoNotes.find(n => n.id === this.dragSource.id);
        } else {
          this.tempNote = this.getNote(this.dragSource.id);
        }
      } else this.tempNote = null;
    },
  },
  methods: {
    ...mapActions('projects', { updateProject: 'update' }),
    ...mapActions('notes', { createNote: 'create', updateNote: 'update' }),
    ...mapMutations('draggable', ['dragOver', 'dragEnd']),
    ...mapMutations('demo', {
      createDemo: 'createNote', updateDemoNote: 'updateNote', updateDemoProj: 'updateProject',
    }),
    keyDownHandl(ev) {
      if (ev.keyCode === 13) {
        this.saveTitle();
      }
    },
    async dropHandle(ev) {
      ev.preventDefault();
      const note = this.demo
        ? this.demoNotes.find(n => n.id === this.dragSource.id)
        : this.getNote(this.dragSource.id);
      const updated = { ...note };
      updated.listIndex = this.index;
      if (this.demo) {
        this.updateDemoNote(updated);
      } else {
        await this.updateNote(updated);
      }
      this.dragEnd();
    },
    saveTitle() {
      if (this.newTitle && this.newTitle !== this.listTitle) {
        const updated = !this.demo ? { ...this.project } : { ...this.demoProject };
        const updatedLists = { ...updated.lists };
        updatedLists[this.index] = this.newTitle;
        updated.lists = updatedLists;
        if (this.demo) {
          this.updateDemoProj(updated);
        } else {
          this.updateProject(updated);
        }
      }
      this.editTitle = false;
    },
    newNote() {
      const newNote = BuildNote(this.index);
      if (this.demo) {
        this.createDemo(newNote);
      } else { this.createNote(newNote); }
    },
    deleteNote(noteId) {
      this.list.delNote(noteId);
      this.$emit('note-del');
    },
  },
};
</script>

<style lang="scss" scoped>
  .list-container {
    position: relative;
    width: 336px;
    margin-right: 24px;
  }
  .list-title {
      display: block;
      width: 316px;
      padding-left: 4px;
      font-size: 48px;
      font-weight: 600;
      line-height: 38px;
      word-wrap: break-word;
      opacity: .33;
      border: none;
      &:focus {
        opacity: .66;
      }
  }
  .note-list {
    position: relative;
    overflow: visible;
    .group {
      margin: 0 0 28px;
    }
  }
  .drag-target {
    position: absolute;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 336px;
    border: 0.2rem solid white;
    background: rgba(0, 0, 0, 0.33);
    opacity: 0.4;
    &.targeted {
      opacity: 0.8;
      background: none;
    }
  }
</style>
