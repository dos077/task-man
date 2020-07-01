<template>
  <div>
    <v-content>
      <div class="recents">
        <section>
          <div class="section-title ttl">Recents</div>
          <v-hover v-slot:default="{ hover }">
            <v-sheet
              :color="hover ? '#fafafa' : '#e0e0e0'" class="sheet"
              :elevation="hover ? 3 : 0" tile
              @click="newProject"
              style="cursor: pointer"
            >
              <p style="text-align: center;">
                <v-icon color="#212121" style="font-size: 72px; margin: 8px auto;">
                  add
                </v-icon>
              </p>
              <footer style="background-color: #dcedc8" class="body">
                New Project
              </footer>
            </v-sheet>
          </v-hover>
          <v-hover v-for="proj in recents" :key="proj.id"
          v-slot:default="{ hover }">
            <v-sheet
              :color="hover ? '#fafafa' : '#e0e0e0'" class="sheet"
              :elevation="hover ? 3 : 0" tile
              @click="$router.push(`/project/${proj.id}`)"
            >
              <footer class="due body" v-if="dueTasks(proj).length > 0">
                {{ dueTasks(proj).length }} Due Soon
              </footer>
              <div class="ttl title">{{ proj.title }}</div>
            </v-sheet>
          </v-hover>
          <div style="clear: both;"></div>
        </section>
      </div>
      <div>
        <section>
          <div class="section-title ttl">All Projects</div>
          <v-hover v-for="proj in projects" :key="proj.id"
          v-slot:default="{ hover }">
            <v-sheet
              :color="hover ? '#fafafa' : '#eeeeee'" class="sheet"
              :elevation="hover ? 3 : 0" tile
            >
              <footer class="body" :class="{'active': hover}"
                :style="`background-color: ${time2color(proj.updateTimestamp)}`">
                {{ showDate(proj.updateTimestamp) }}
                <v-btn v-if="hover" class="ttl" color="#212121" text
                  @click="$router.push(`/project/${proj.id}`)"
                >open</v-btn>
                <v-btn v-if="hover" class="ttl" color="#c62828" text
                  @click="deleteProject(proj.id)"
                >delete</v-btn>
              </footer>
              <div class="ttl title">{{ proj.title }}</div>
            </v-sheet>
          </v-hover>
          <div style="clear: both;"></div>
        </section>
      </div>
    </v-content>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProjectTemplate from '@/template/project';

export default {
  name: 'Browser',
  data() {
    return {
      recents: [],
    };
  },
  computed: {
    ...mapState('projects', { projects: 'items', current: 'current' }),
  },
  methods: {
    ...mapActions('projects', { createProject: 'create', readAll: 'getAll', deleteProject: 'delete' }),
    async newProject() {
      const blank = ProjectTemplate();
      await this.createProject(blank);
      // this.$router.push({ path: `/projects/${this.current.id}` });
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
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    padding: 24px 12px 12px;
    background-color: #212121;
    color: #fafafa;
    font-size: 38px;
  }
  .recents {
    width: 100%;
    background-color: #424242;
    margin-bottom: 12px;
  }
  .sheet {
    width: 152px;
    height: 152px;
    overflow: hidden;
    margin: 0 12px 24px;
    float: left;
    padding: 12px 12px 52px;
    position: relative;
    transition: background-color .5s ease-out;
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
</style>
