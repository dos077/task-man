<template>
  <v-app style="background-color: #e0e0e0;">
    <router-view
      :gapiOn="gapiOn"
      :driveOn="driveOn"
      @sign-in="signIn"
      @sign-out="signOut"
      :projects="projects"
      :prefs="prefs"
      style="min-height: 100%;"
    ></router-view>
  </v-app>
</template>

<script>
import gapiConfigs from './gapi/gapiConfigs';
import Gauth from './gapi/Gauth';
import ProjectsController from './controllers/ProjectsController';
import Prefs from './controllers/PreferencesController';

export default {
  name: 'App',
  data: () => ({
    //
    gapiOn: false,
    driveOn: false,
    gapiAuth: null,
    projects: ProjectsController(),
    prefs: Prefs(),
  }),
  methods: {
    gapiSuccess() {
      this.gapiOn = true;
      // eslint-disable-next-line
      this.gapiAuth = Gauth(gapi, this.driveConnected, this.driveDisconnected);
    },
    driveConnected() {
      this.driveOn = true;
      // eslint-disable-next-line
      this.projects.loadRemote(gapi);
    },
    driveDisconnected() { this.driveOn = false; },
    signIn() { if (this.gapiAuth) this.gapiAuth.signIn(); },
    signOut() { if (this.gapiAuth) this.gapiAuth.signOut(); },
  },
  created() {
    const {
      script, discoveryDocs, clientId, scope,
    } = gapiConfigs;

    const markGapi = this.gapiSuccess;

    function initClient() {
      // eslint-disable-next-line
      gapi.client.init({
        discoveryDocs,
        clientId,
        scope,
      }).then(markGapi);
    }

    script.onload = () => {
      // eslint-disable-next-line
      gapi.load('client:auth2', initClient);
    };

    document.body.append(script);
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
</style>
