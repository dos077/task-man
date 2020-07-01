<template>
  <v-container style="width: 100%; padding: 0; margin: 8px 0 32px;">
    <v-sheet
      class="body"
      tile
      elevation="2"
      style="width: 320px; padding: 16px;"
      :style="`background-color: ${background}; transition: background .5s;`"
    >
      <v-form @submit="save">
        <v-row no-gutters style="margin-bottom: -4px;"><v-col>
          <v-textarea
            label="Title"
            auto-grow
            rows=1
            style="font-size: 18px;"
            class="ttl"
            v-model="noteCopy.title"
          ></v-textarea>
        </v-col></v-row>
        <v-row no-gutters style="margin-bottom: -4px;">
          <v-col>
            <v-textarea
              autofocus
              auto-grow
              label="Body"
              rows=1
              style="font-size: 18px;"
              v-model="noteCopy.body"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row no-gutters style="margin-bottom: -24px;">
          <v-col>
            <div class="label">Priority</div>
            <div class="colors">
              <span class="c0"
                :class="{ selected: noteCopy.color === 0 }"
                @click="noteCopy.color = 0"
              ></span>
              <span class="c1"
                :class="{ selected: noteCopy.color === 1 }"
                @click="noteCopy.color = 1"></span>
              <span class="c2"
                :class="{ selected: noteCopy.color === 2 }"
                @click="noteCopy.color = 2"></span>
              <span class="c3"
                :class="{ selected: noteCopy.color === 3 }"
                @click="noteCopy.color = 3"></span>
              <span class="c4"
                :class="{ selected: noteCopy.color === 4 }"
                @click="noteCopy.color = 4"></span>
            </div>
          </v-col>
          <v-col>
            <v-menu
              v-model="dateMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  label="Deadline"
                  readonly
                  v-on="on"
                  v-model="noteCopy.due"
                  clearable
                  prepend-icon="event"
                  style="width: 100%; color: #424242;"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="noteCopy.due"
                no-title
                scrollable
                class="ttl"
                @input="dateMenu = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row no-gutters style="padding-bottom: 12px;">
          <v-col cols="auto">
            <v-btn
              text
              color="#b71c1c"
              class="ttl"
              @click="delNote(note.id)"
            >
              <v-icon>delete</v-icon>del
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              v-if="noteCopy.listIndex > 0"
              text
              color="#424242"
              class="ttl"
              @click="rewind"
            >
              re<v-icon>chevron_left</v-icon>
            </v-btn>
            <v-btn
              text
              color="#424242"
              class="ttl"
              @click="finished()"
            >
              Fin<v-icon>double_arrow</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-btn
          fab
          absolute
          color="#fafafa"
          small
          style="left: 140px;"
          @click="save"
        >
          <v-icon color="#616161">done</v-icon>
        </v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NoteForm',
  props: ['note'],
  data() {
    return {
      dateMenu: false,
      colors: [
        '#eeeeee',
        '#b2ebf2',
        '#dcedc8',
        '#fff9c4',
        '#ffe0b2',
      ],
      noteCopy: Object.assign({}, this.note),
    };
  },
  computed: {
    dueDate() {
      if (!this.noteCopy.due) return 'None';
      return this.noteCopy.due;
    },
    background() {
      return this.colors[this.noteCopy.color];
    },
    isChange() {
      return Object.keys(this.note).some(key => this.note[key] !== this.noteCopy[key]);
    },
  },
  methods: {
    ...mapActions('notes', { update: 'update', delNote: 'delete' }),
    async rewind() {
      if (this.noteCopy.listIndex > 0) {
        this.noteCopy.listIndex -= 1;
        await this.update({ ...this.noteCopy });
      }
      this.$emit('edit-done');
    },
    async finished() {
      this.noteCopy.due = null;
      this.noteCopy.listIndex += 1;
      await this.update({ ...this.noteCopy });
      this.$emit('edit-done');
    },
    async save() {
      if (this.isChange) await this.update({ ...this.noteCopy });
      this.$emit('edit-done');
    },
  },
};
</script>

<style lang="scss" scoped>
  .label {
    margin-bottom: 4px;
    font-size: 12px;
    line-height: 18px;
    color: #616161;
  }
  .colors {
    margin-left: -6px;
    span {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 4px;
      border: 2px solid #616161;
      border-radius: 50%;
      &:hover { border-color: #212121; }
    }
    .selected { border-color: #fafafa; }
    .c0 { background-color: #eeeeee; }
    .c1 { background-color: #b2ebf2; }
    .c2 { background-color: #dcedc8; }
    .c3 { background-color: #fff9c4; }
    .c4 { background-color: #ffe0b2; }
  }
</style>
