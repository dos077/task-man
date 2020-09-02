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
        <v-alert color="red darken-3">
          Demonstration only, all edits will be gone at the end of the session.
        </v-alert>
        <v-btn
          class="ttl" text color="#fafafa"
          @click="$router.push('/')"
        >
          Back to Home
        </v-btn>
      </div>
      <div class="menu-group">
        <div class="ttl title">Account</div>
        <div class="body">Login to for the full feature beta</div>
        <v-btn text class="ttl" color="green lighten-1" @click="$router.push('/login')">
          login
        </v-btn>
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
          @click="sortToggle = 0"
        >Date</v-btn>
        <v-btn
          height="36"
          class="ttl"
          @click="sortToggle = 1"
        >Priority</v-btn>
      </v-btn-toggle>
    </v-app-bar>
    <v-content
      style="background: #e0e0e0; overflow: auto; min-height: 100%;"
      app
    >
      <v-alert color="red lighten-3">
        Demonstration only, all edits will be gone at the end of the session.
      </v-alert>
      <v-container fluid style="padding: 16px 24px 24px">
        <div
          class="lists py-6"
          :style="`width: ${360 * lists.length}px;`"
        >
          <list
            v-for="(list, i) in lists"
            :key="i"
            :notes="list"
            :sort="sortToggle"
            :index="i"
          />
          <div style="clear: both;" />
        </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import List from './components/List.vue';

export default {
  name: 'Demo',
  components: { List },
  data() {
    return {
      drawerOn: null,
      sortToggle: 0,
      editTitle: false,
      newTitle: '',
    };
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('demo', { project: 'project', notes: 'notes' }),
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
    user: {
      handler(to) {
        if (to) this.$router.push('/');
      },
      immediate: true,
    },
  },
  created() {
    this.demoOn();
  },
  unmounted() {
    this.demoOff();
  },
  methods: {
    ...mapMutations('demo', {
      updateProject: 'updateProject',
      demoOn: 'turnOn',
      demoOff: 'turnOff',
    }),
    saveTitle() {
      if (this.newTitle !== this.project.title) {
        const updated = { ...this.project };
        updated.title = this.newTitle;
        this.updateProject(updated);
      }
    },
    keyDownHandl(ev) {
      if (ev.keyCode === 13) {
        this.saveTitle();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .lists {
    display: flex;
    min-height: 100%;
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
