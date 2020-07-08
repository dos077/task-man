<template>
  <div>
    <v-navigation-drawer
      v-model="drawerOn"
      dark
      color="#424242"
      app
    >
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="user.photoURL" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.displayName }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-btn color="#c62828" @click="logout">
            logout
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-content app>
      <div class="recents">
        <section>
          <div style="display: flex; justify-content: space-between">
            <v-sheet
              tile
              color="#212121"
              class="ttl logo"
            >
              Task-Man
            </v-sheet>
            <v-btn
              dark
              text
              class="ttl my-3"
              color="#dcedc8"
              @click="newProject"
              :disabled="loading"
            >
              <v-icon>add</v-icon> new project
            </v-btn>
          </div>
          <div class="section-title ttl">Account</div>
          <div class="body mb-2" style="color: #fafafa;">
            <span class="mr-2">{{ user.displayName }}</span> |
            <span class="ml-2">{{ user.email }}</span>
          </div>
          <v-btn text class="ttl mb-4" color="red lighten-2" @click="logout" :disabled="loading">
            logout
          </v-btn>
          <div style="clear: both;" />
        </section>
      </div>
      <div style="padding-top: 24px;">
        <section>
          <div class="section-title ttl">All Projects</div>
          <div class="menu-list" v-for="proj in projects" :key="proj.id">
            <span
              class="title ttl"
              :class="{ md: $vuetify.breakpoint.smAndUp }"
              @click="readProject(proj.id)"
            >
              {{ proj.title }}
            </span>
            <span v-if="$vuetify.breakpoint.smAndUp" class="body md">|</span>
            <span class="body" :class="{ md: $vuetify.breakpoint.smAndUp }">
              Last Updated {{ showDate(proj.updateTimestamp) }}
            </span>
            <v-dialog v-model="deleteConfirms[proj.id]" max-width="480">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ttl"
                  text
                  color="#c62828"
                  v-bind="attrs"
                  v-on="on"
                  :disabled="loading"
                >
                  delete
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="red lighten-3" primary-title>
                  Press to confirm
                </v-card-title>
                <v-card-text class="mt-2">
                  {{ proj.title }} will be erased permanently.
                </v-card-text>
                <v-card-actions>
                  <v-btn text="" color="red darken-2" @click="deleteProject(proj.id)">
                    confirm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div style="clear: both;" />
          </div>
        </section>
      </div>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from 'firebase/app';
import ProjectTemplate from '@/template/project';

export default {
  name: 'Browser',
  data() {
    return {
      recents: [],
      deleteConfirms: {},
      drawerOn: null,
    };
  },
  computed: {
    ...mapState('projects', { projects: 'items', current: 'current' }),
    ...mapState('projects', ['creationgPending', 'updatePending', 'deletionPending']),
    ...mapState('authentication', ['user']),
    loading() {
      return this.creationPending
      || this.deletionPending.length > 0
      || this.updatePending.length > 0;
    },
  },
  watch: {
    current(to) {
      if (to) this.$router.push(`/project/${to.id}`);
    },
  },
  methods: {
    ...mapActions('projects', {
      createProject: 'create',
      readProject: 'read',
      readAll: 'getAll',
      deleteProject: 'delete',
    }),
    async newProject() {
      const blank = ProjectTemplate();
      this.createProject(blank);
    },
    dueTasks(proj) {
      const dues = [];
      proj.lists.forEach((list) => {
        list.notes.forEach((note) => {
          const dueTime = (note.due) ? new Date(note.due) : null;
          if (dueTime && (dueTime - Date.now()) < 432000000) {
            dues.push({ title: note.title, due: note.due });
          }
        });
      });
      return dues;
    },
    showDate(stamp) {
      const date = new Date(stamp);
      const months = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
      return `${months[date.getMonth()]} ${date.getDate()}`;
    },
    time2color(time) {
      const colors = [
        '#ffe0b2',
        '#fff9c4',
        '#dcedc8',
        '#b2ebf2',
        '#eeeeee',
      ];
      const date = new Date(time);
      const now = Date.now();
      const delta = Math.floor((now - date) / (1000 * 60 * 60 * 72));
      return (delta < 4) ? colors[delta] : colors[4];
    },
    async logout() {
      await firebase.auth().signOut();
      this.$router.push('/');
    },
  },
  mounted() {
    document.title = 'Taskman';
    if (!this.projects) this.readAll();
  },
};
</script>

<style lang="scss" scoped>
  section {
    position:relative;
    overflow: visible;
    max-width: 768px;
    min-height: 100px;
    margin: 0 auto;
    padding-left: 12px;
    .section-title{
      margin-left: -12px;
      width: 100%;
      font-size: 48px;
      font-weight: 600;
      color: #aaa;
    }
  }
  .logo {
    display: inline-block;
    height: 62px;
    margin-left: -12px;
    color: #fff;
    font-size: 24px;
    line-height: 30px;
    padding: 16px 16px;
  }
  .recents {
    width: 100%;
    margin-bottom: 12px;
    background-color: #424242;
  }
  .sheet {
    position: relative;
    width: 152px;
    height: 152px;
    overflow: hidden;
    margin: 0 12px 24px;
    float: left;
    padding: 12px 12px 52px;
    cursor: pointer;
    transition: background-color .5s ease-out;
    &.double{
      width: 316px;
    }
    footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 152px;
      height: 40px;
      padding: 8px 12px;
      color: #424242;
      font-size: 18px;
      &.due {
        background-color: #ffcdd2;
      }
      &.active {
        height: 152px;
        .ttl {
          margin: 8px 24px 0 0;
        }
      }
      transition: height  .3s ease-in;
    }
    .title {
      color: #212121;
      font-size: 24px;
    }
  }
  .menu-list{
    margin-bottom: 18px;
    align-items: center;
    font-size: 18px;
    color: #616161;
    span {
      display: block;
      margin-left: 12px;
      margin-right: 12px;
      &.md {
        margin-left: 0;
        display: inline-block;
      }
    }
    .title {
      font-size: 30px;
      color: #212121;
      cursor: pointer;
      &:hover{
        text-decoration: underline;
      }
    }
  }
</style>
