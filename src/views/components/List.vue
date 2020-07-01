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
        @blur="saveTitle"
      ></v-textarea>
    </v-slide-x-transition>
    <div class="note-list">
      <v-btn
        fab
        absolute
        color="#fafafa"
        small
        elevation="3"
        width="36"
        height="36"
        style="top: -18px; right: -2px;"
        @click="newNote()"
      >
        <v-icon color="#616161">add</v-icon>
      </v-btn>
      <div v-for="(group, i) in groups" :key="i" class="group">
        <note v-for="note in group" :key="note.id" :note="note"
          @finish-note="$emit('note-done', note)"
          @rewind-note="$emit('note-rewind', note)"
          @new-update="$emit('new-update')"
        >
        </note>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Note from './Note.vue';
import BuildNote from '@/template/note';

const sortByDue = (a, b) => {
  const aDue = (a.due) ? new Date(a.due) : 0;
  const bDue = (b.due) ? new Date(b.due) : 0;
  return aDue - bDue;
};

export default {
  name: 'List',
  props: ['notes', 'index', 'sort'],
  data() {
    return {
      editTitle: false,
      newTitle: '',
    };
  },
  components: {
    Note,
  },
  computed: {
    ...mapState('projects', { project: 'current' }),
    listTitle() {
      return this.project.lists[this.index];
    },
    groups() {
      const sortedNotes = [...this.notes].sort(sortByDue);
      let groups = [];
      if (this.sort === 0) {
        groups = [sortedNotes];
      }
      if (this.sort === 1) {
        const pg = [];
        [4, 3, 2, 1, 0].forEach((c) => {
          const notes = sortedNotes.filter(n => n.color === c);
          if (notes.length > 0) pg.push(notes);
        });
        groups = pg;
      }
      return groups;
    },
  },
  watch: {
    listTitle: {
      handler(to) { this.newTitle = to; },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('projects', { updateProject: 'update' }),
    ...mapActions('notes', { createNote: 'create' }),
    async saveTitle() {
      if (this.newTitle && this.newTitle !== this.listTitle) {
        const updated = { ...this.project };
        const updatedLists = { ...updated.lists };
        updatedLists[this.index] = this.newTitle;
        updated.lists = updatedLists;
        await this.updateProject(updated);
      }
      this.editTitle = false;
    },
    newNote() {
      const newNote = BuildNote(this.index);
      this.createNote(newNote);
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
</style>
