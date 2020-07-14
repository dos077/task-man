<template>
  <div v-if="project">
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
        <v-btn-toggle
          v-if="$vuetify.breakpoint.smAndDown"
          color="#fafafa"
          v-model="sortToggle"
        >
          <v-btn height="36" class="ttl"
          @click="sortToggle = 0">Date</v-btn>
          <v-btn height="36" class="ttl"
          @click="sortToggle = 1">Priority</v-btn>
        </v-btn-toggle>
      </div>
      <div class="menu-group">
        <div class="ttl title">Projects Controls</div>
        <v-btn
          class="ttl"
          text
          color="#dcedc8"
          @click="newProj"
        >new project</v-btn>
        <v-btn
        class="ttl" text color="#fafafa"
        @click="$router.push('/projects')"
        >Browser</v-btn>
      </div>
      <div class="menu-group">
        <div class="ttl title">Recent Projects</div>
        <div v-for="(proj, index) in recents" :key="index" class="body">
          <div class="ttl" style="margin-top: 8px;" >
            {{ proj.title }}
            <v-btn small icon color="#eeeeee" :to="`/project/${proj.id}`">
              <v-icon>edit</v-icon>
            </v-btn>
          </div>
          <div>
            {{ showDate(proj.updateTimestamp) }}
          </div>
        </div>
      </div>
      <div class="menu-group">
        <div class="ttl title">Account</div>
        <div class="body mt-2">{{ user.displayName }}</div>
        <div class="body">{{ user.email }}</div>
        <v-btn text class="ttl" color="red lighten-1" @click="logout">logout</v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      height="76px"
      color="#eeeeee"
      style="padding: 4px 16px 8px;"
      app
    >
      <v-app-bar-nav-icon color="#212121" @click="drawerOn = !drawerOn"></v-app-bar-nav-icon>
      <v-toolbar-title style="font-size: 24px; color: #212121; padding-left: 8px;">
        <span v-if="!editTitle" class="ttl" @click="editTitle = true">
          {{ project.title }}
        </span>
        <v-text-field
          v-if="editTitle"
          :disabled="loading"
          autofocus
          style="font-size: 18px; margin-top: 12px;"
          class="ttl"
          v-model="newTitle"
          @blur="saveTitle"
          @keydown="keyDownHandl"
        >
        </v-text-field>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span mdAndUp=true class="body label"
      v-if="$vuetify.breakpoint.mdAndUp">Sort By</span>
      <v-btn-toggle
        v-if="$vuetify.breakpoint.mdAndUp"
        color="#212121"
        v-model="sortToggle"
      >
        <v-btn
          height="36"
          class="ttl"
          :disabled="loading"
          @click="sortToggle = 0"
        >Date</v-btn>
        <v-btn
          height="36"
          class="ttl"
          :disabled="loading"
          @click="sortToggle = 1"
        >Priority</v-btn>
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
          <list
            v-for="(list, i) in lists" :key="i" :notes="list" :sort="sortToggle" :index="i"
          >
          </list>
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from 'firebase/app';
import List from './components/List.vue';
import BuildProject from '@/template/project';

export default {
  name: 'Project',
  components: {
    List,
  },
  data() {
    return {
      drawerOn: null,
      recents: [],
      sortToggle: 0,
      editTitle: false,
      newTitle: '',
      lastUpate: 0,
    };
  },
  computed: {
    ...mapState('projects', { project: 'current', projects: 'items' }),
    ...mapState('projects', ['creationgPending', 'updatePending', 'deletionPending']),
    ...mapState('notes', { notes: 'items' }),
    ...mapState('authentication', ['user']),
    loading() {
      return this.creationPending
      || this.deletionPending.length > 0
      || this.updatePending.length > 0;
    },
    lists() {
      if (!this.notes || this.notes.length === 0) return [[]];
      const nList = Math.max(...this.notes.map(n => n.listIndex));
      const arr = new Array(nList);
      for (let i = 0; i <= nList; i += 1) { arr[i] = []; }
      this.notes.forEach((n) => {
        arr[n.listIndex].push(n);
      });
      return arr;
    },
  },
  watch: {
    sortToggle(to) {
      if (to === 0 || to === 1) {
        const updated = { ...this.project };
        updated.sortPref = to;
        this.updateProject(updated);
      }
    },
    $route: {
      async handler(to) {
        const newId = to.params.pid;
        if (!newId) return;
        if (!this.project || newId !== this.project.id) {
          await this.readProject(newId);
        }
        this.newTitle = this.project.title;
        if (this.project.sortPref) this.sortToggle = this.project.sortPref;
      },
      immediate: true,
    },
    project: {
      handler(to) { if (to) this.loadNotes(); },
      immediate: true,
    },
    projects: {
      handler(to) {
        if (to) {
          this.recents = to.length > 3 ? to.slice(0, 3) : to;
        }
      },
      immediate: true,
    },
    notes(to, from) {
      const time = new Date();
      if (from && time - this.lastUpate > 60000) {
        this.lastUpate = time;
        this.updateProject({ ...this.project });
      }
    },
  },
  methods: {
    ...mapActions('projects', { createProject: 'create', readProject: 'read', updateProject: 'update' }),
    ...mapActions('notes', { loadNotes: 'getAll' }),
    async newProj() {
      await this.createProject(BuildProject());
      const newPath = `/project/${this.project.id}`;
      this.$router.push({ path: newPath });
    },
    keyDownHandl(ev) {
      if (ev.keyCode === 13) {
        this.saveTitle();
      }
    },
    saveTitle() {
      if (this.newTitle !== this.project.title) {
        const updated = { ...this.project };
        updated.title = this.newTitle;
        this.updateProject(updated);
      }
      this.editTitle = false;
    },
    showDate(stamp) {
      const date = new Date(stamp);
      const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
      return `${months[date.getMonth()]} ${date.getDate()}`;
    },
    async logout() {
      await firebase.auth().signOut();
      this.$router.push('/');
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
