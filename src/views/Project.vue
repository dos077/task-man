<template>
  <div>
    <v-navigation-drawer
      v-model="drawerOn"
      dark
      color="#424242"
      app
    >
      <v-sheet
        tile
        color="#212121"
        class="ttl"
        style="color: #fafafa; font-size: 30px; padding: 15px 16px 16px 24px;"
      >
        Task-Man
      </v-sheet>
      <div class="menu-group">
        <div class="ttl title">Projects Controls</div>
        <v-btn
        class="ttl"
        text
        color="#dcedc8"
        @click="noteNew"
        >new project</v-btn>
        <v-btn
        class="ttl"
        text
        color="#fafafa"
        >Browser</v-btn>
      </div>
      <div class="menu-group">
        <div class="ttl title">Recent Projects</div>
        <div v-for="(proj, index) in recents" :key="index" class="body">
          <div class="ttl" style="margin-top: 8px;" @click="noteLoad(proj.id)">
            {{ proj.title }}
            <v-btn small icon color="#eeeeee"><v-icon>edit</v-icon></v-btn>
          </div>
          <div>
            {{ showDate(proj.updated) }}
          </div>
        </div>
      </div>
      <div v-if="gapiOn" class="menu-group">
        <div class="ttl title">
          Google Drive
        </div>
        <div v-if="driveOn" class="body">
          Connected<br/>
          Status: Up-to-date
        </div>
        <v-btn
          v-if="driveOn"
          text
          class="ttl"
          color="#f44336"
          @click="$emit('sign-out')"
        >
          Disconnect
        </v-btn>
        <v-btn
          v-if="!driveOn"
          text
          class="ttl"
          color="#dcedc8"
          @click="$emit('sign-in')"
        >
          Connect
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      hide-on-scroll
      :color="(drawerOn) ? '#212121' : '#eeeeee'"
      style="padding: 4px 16px 8px;"
      app
    >

      <v-app-bar-nav-icon color="#212121" @click="drawerOn = !drawerOn"></v-app-bar-nav-icon>

      <v-toolbar-title style="font-size: 24px; color: #212121; padding-left: 8px;">
        <input class="ttl" v-model="project.title" @blur="save">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="body label"
      v-if="!drawerOn">Sort By</span>
      <v-btn-toggle
        v-if="!drawerOn"
        color="#212121"
        v-model="sortToggle"
      >
        <v-btn height="36" class="ttl"
        @click="prefs.sort = 'date'">Date</v-btn>
        <v-btn height="36" class="ttl"
        @click="prefs.sort = 'priority'">Priority</v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-content
      style="background: #e0e0e0; overflow: auto; min-height: 100%;"
      app
    >
      <v-container fluid style="padding: 16px 24px 24px">
        <div
          class="lists"
          :style="`width: ${360 * project.lists.length}px;`"
        >
          <list v-for="list in project.lists" :key="list.id" :list="list" :sort="prefs.sort"
            @note-done="noteDone"
            @note-rewind="noteRewind"
            @note-del="noteDel"
            @new-update="save"
          >
          </list>
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import List from './List.vue';

export default {
  name: 'Project',
  components: {
    List,
  },
  props: ['gapiOn', 'driveOn', 'projects', 'prefs'],
  data() {
    return {
      drawerOn: null,
      project: this.projects.data.current,
      recents: this.projects.data.recents,
      sortToggle: (this.prefs.sort === 'date') ? 0 : 1,
    };
  },
  methods: {
    save() {
      this.project.updated = Date.now();
      this.projects.save();
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
    noteNew() {
      this.project = this.projects.create();
    },
    async noteLoad(pId) {
      this.drawerOn = false;
      this.save();
      const loadSuccess = await this.projects.load(pId);
      if (loadSuccess) {
        this.project = this.projects.data.current;
        this.recents = this.projects.data.recents;
      }
    },
    showDate(stamp) {
      const date = new Date(stamp);
      const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
      return `${months[date.getMonth()]} ${date.getDate()}`;
    },
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
  .menu-group {
    margin: 16px 16px 32px 24px;
    .title {
      font-size: 24px;
      color: #fafafa;
    }
    .body {
      font-size: 18px;
      color: #e0e0e0;
      margin-left: 16px;
      margin-bottom: 4px;
    }
  }
</style>
