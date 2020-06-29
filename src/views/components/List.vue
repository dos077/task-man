<template>
  <div class="list-container">
    <v-slide-x-transition hide-on-leave>
      <span v-if="!editTitle" class="ttl list-title" @click="editTitle = true">
        {{ list.title || 'No Title' }}
      </span>
      <v-textarea
        v-if="editTitle"
        autofocus
        class="ttl"
        v-model="list.title"
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
          @delete="deleteNote(note.id)"
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
import Note from './Note.vue';

export default {
  name: 'List',
  props: ['list', 'sort'],
  data() {
    return {
      editTitle: false,
    };
  },
  components: {
    Note,
  },
  computed: {
    groups() {
      let groups = [];
      if (this.sort === 'date') {
        this.sortNotes();
        groups = [this.list.notes];
      }
      if (this.sort === 'priority') {
        this.sortNotes();
        const pg = [];
        [4, 3, 2, 1, 0].forEach((c) => {
          const notes = this.list.notes.filter(n => n.color === c);
          if (notes.length > 0) pg.push(notes);
        });
        groups = pg;
      }
      return groups;
    },
  },
  methods: {
    sortNotes() {
      this.list.notes.sort((a, b) => {
        const aDue = (a.due) ? new Date(a.due) : 0;
        const bDue = (b.due) ? new Date(b.due) : 0;
        return aDue - bDue;
      });
    },
    newNote() {
      this.list.newNote();
      this.$emit('new-update');
    },
    deleteNote(noteId) {
      this.list.delNote(noteId);
      this.$emit('note-del');
    },
    saveTitle() {
      this.editTitle = false;
      this.$emit('new-update');
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
