<template>
  <v-app style="background-color: #e0e0e0;">
    <router-view
      style="min-height: 100%;"
    >
    </router-view>
  </v-app>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapState('authentication', ['user']),
  },
  watch: {
    user: {
      handler(to) {
        if (to) this.loadProjects();
        else this.setProjects(null);
      },
      immediate: true,
    },
  },
  methods: {
    ...mapActions('projects', { loadProjects: 'getAll' }),
    ...mapMutations('projects', { setProjects: 'set' }),
  },
};
</script>

<style lang="scss">
  body {
    background-color: #eeeeee;
  }
  .body {
    font-family: 'Cormorant', serif;
    font-size: 18px;
    line-height: 24px;
    color: #424242;
  }
  .ttl {
    font-family: 'Libre Franklin', serif;
    font-weight: 500;
    label {
      font-family: 'Cormorant', serif;
      font-weight: 400;
    }
  }
  .fullscreen {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.2);
    span {
      font-size: 18px;
      margin-right: 12px;
      color: #212121;
    }
  }
  .v-overlay {
    z-index: 6 !important;
  }
</style>
