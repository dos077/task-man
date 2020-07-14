<template>
<v-scroll-x-transition hide-on-leave>
  <v-card
    v-if="!edit"
    :loading="loading"
    @click="edit = true"
    :color="colors[note.color]"
    :elevation="hover || dragging ? 4 : 0"
    class="body"
    :class="{ 'dragging': dragOn && dragSource.id === note.id }"
    tile
    style="width: 320px; margin-right: 16px; margin-bottom: 4px; position: relative;"
    draggable="true"
    @dragstart="downHandler"
    @dragend="dragEnd"
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
  </v-card>
  <note-form
    v-else
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
    ...mapState('notes', ['creationgPending', 'updatePending', 'deletionPending']),
    loading() {
      return this.creationPending
      || this.deletionPending.length > 0
      || this.updatePending.length > 0;
    },
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
    document.removeEventListener('dragend', this.endHandler);
  },
  watch: {
    note(to) {
      const newness = Date.now() - to.createTimestamp;
      if (newness <= 500) this.edit = true;
      else this.edit = false;
    },
    immediate: true,
  },
  methods: {
    ...mapMutations('draggable', ['dragStart', 'dragEnd']),
    ...mapActions('notes', { updateNote: 'update' }),
    downHandler(ev) {
      if (!this.dragOn) {
        ev.dataTransfer.setData('text/plain', null);
        const { id, listIndex } = this.note;
        this.dragStart({ id, listIndex });
        document.addEventListener('dragend', this.endHandler);
      }
    },
    endHandler() {
      document.removeEventListener('dragend', this.endHandler);
      this.dragEnd();
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
