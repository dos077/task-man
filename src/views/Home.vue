<template>
  <v-content>
    <v-container fill-height>
      <v-row align-content="center" justify="center">
        <v-col>
          Task-man is a free and open source passion project that's built on the Vue framework, Vuetify UI library and Firebase cloud database for easy syncing across any devices.

          This live build is already setup with a test firebase account. You can try it out by login and sign up with your Google account.
        </v-col>
      </v-row>
      <v-row>
        <v-col><v-btn to="/login">Signup</v-btn></v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'Home',
};
</script>
