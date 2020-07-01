<template>
<v-scroll-x-transition hide-on-leave>
  <v-sheet
    v-if="!edit"
    @click="edit = true"
    :color="colors[note.color]"
    :elevation="hover ? 4 : 0"
    class="body"
    :class="{ 'dragging': dragOn && dragSource.id === note.id }"
    tile
    style="width: 320px; margin-right: 16px; margin-bottom: 4px; position: relative;"
    draggable="true"
    @dragstart="downHandler"
    @mouseenter="!dragOn ? hover = true : null"
    @mouseleave="!dragOn ? hover = false : null"
  >
    <div v-if="soon" :class="`due-soon d${daysLeft}`"></div>
    <div class="note" :style="`padding-left: ${(soon) ? 8 : 0}px;`">
      <span v-if="note.due !== null" class="due-days">Due in {{daysLeft}} days</span>
      <span class="note-title ttl">{{note.title}}</span>
      <span class="note-body">{{note.body}}</span>
    </div>
    <div style="clear: both;"></div>
  </v-sheet>
  <note-form
    v-if="edit"
    :note="note"
    @edit-done="edit = false"
  ></note-form>
</v-scroll-x-transition>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import NoteForm from './NoteForm.vue';

export default {
  name: 'Note',
  components: {
    NoteForm,
  },
  props: ['note'],
  data() {
    return {
      colors: [
        '#eeeeee',
        '#b2ebf2',
        '#dcedc8',
        '#fff9c4',
        '#ffe0b2',
      ],
      edit: false,
      hover: false,
    };
  },
  computed: {
    ...mapState('draggable', { dragOn: 'dragOn', dragSource: 'source', dragTarget: 'target' }),
    daysLeft() {
      if (this.note.due === null) return 999;
      const now = new Date();
      const due = new Date(this.note.due);
      const days = Math.ceil((due.getTime() - now.getTime()) / 86400000);
      return (days > 0) ? days : 0;
    },
    soon() { return this.daysLeft < 6; },
    dragging() {
      return this.dragOn && (this.dragSource.id === this.note.id);
    },
  },
  beforeDestroy() {
    document.removeEventListener('dragend', this.upHandler);
  },
  methods: {
    ...mapMutations('draggable', ['dragStart', 'dragEnd']),
    ...mapActions('notes', { updateNote: 'update' }),
    downHandler() {
      if (!this.dragOn) {
        const { id, listIndex } = this.note;
        this.dragStart({ id, listIndex });
        this.hover = true;
        document.addEventListener('dragend', this.upHandler);
      }
    },
    async upHandler() {
      if (this.dragTarget !== null) {
        const updated = { ...this.note };
        updated.listIndex = this.dragTarget;
        await this.updateNote(updated);
      }
      this.dragEnd();
      this.hover = false;
      document.removeEventListener('dragend', this.upHandler);
    },
  },
};
</script>

<style lang="scss" scoped>
  .due-soon {
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 100%;
    &.d5 { background-color: #ffcdd2 }
    &.d4 { background-color: #e57373 }
    &.d3 { background-color: #f44336 }
    &.d2 { background-color: #d32f2f }
    &.d1 { background-color: #c62828 }
    &.d0 { background-color: #b71c1c }
  }
  .note {
    display: inline-block;
    width: 284px;
    margin-left: 16px;
    margin-top: 16px;
    margin-bottom: 20px;
    cursor: pointer;
  }
  span {
    display: block;
    width: 100%;
    margin-bottom: 4px;
  }
  .due-days {
    font-size: 12px;
    line-height: 12px;
    color: #616161;
  }
  .note-title {
    font-size: 24px;
    line-height: 30px;
    color: #212121;
  }
  .note-body { color: #424242; }
  .dragging {
    opacity: 0.5;
    user-select: none;
  }
</style>
