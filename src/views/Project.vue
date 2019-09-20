<template>
  <div>
    <v-app-bar
      hide-on-scroll
      color="#eeeeee"
      style="padding: 4px 16px 8px;"
    >

      <v-app-bar-nav-icon color="#212121"></v-app-bar-nav-icon>

      <v-toolbar-title style="font-size: 24px; color: #212121; padding-left: 8px;">
        <input class="ttl" v-model="project.title" @blur="save">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="body label">Sort By</span>
      <v-btn-toggle
        color="#212121"
        v-model="sortToggle"
      >
        <v-btn height="36" class="ttl" @click="sort = 'date'">Date</v-btn>
        <v-btn height="36" class="ttl" @click="sort = 'priority'">Priority</v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-content
      style="background: #e0e0e0;padding: 0 24px; overflow: auto;"
    >
      <div
        class="lists"
        :style="`width: ${360 * project.lists.length}px;`"
      >
        <list v-for="list in project.lists" :key="list.id" :list="list" :sort="sort"
          @note-done="noteDone"
          @note-rewind="noteRewind"
          @note-del="noteDel"
          @new-update="save"
        >
        </list>
      </div>
    </v-content>
  </div>
</template>

<script>
import currentProject from '../dataLogic/currentProject';
import List from './List.vue';

export default {
  name: 'Project',
  components: {
    List,
  },
  props: [],
  data() {
    return {
      sortToggle: 0,
      sort: 'date',
      project: {},
    };
  },
  methods: {
    save() {
      this.project.saveLocal();
    },
    noteDone(note) {
      this.project.noteDone(note);
      this.save();
    },
    noteRewind(note) {
      this.project.noteDone(note, -1);
      this.save();
    },
    noteDel() {
      this.project.trimLists();
      this.save();
    },
  },
  created() {
    this.project = currentProject();
  },
};
</script>

<style lang="scss" scoped>
  .lists {
    display: flex;
    min-height: 100%;
    padding: 24px 0;
  }
  .label {
    display: inline-block;
    margin-top: 4px;
    margin-right: 16px;
    font-size: 12px;
    line-height: 12px;
    color: #616161;
  }
</style>
