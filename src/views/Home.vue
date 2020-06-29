<template>
  <v-content>
    <v-container fill-height>
      <v-row align-content="center" justify="center">
        <v-col>
          Home page placeholder.
        </v-col>
      </v-row>
      <v-row>
        <v-col><v-btn to="/login">Signup</v-btn></v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState('authentication', ['user']),
  },
  watch: {
    user: {
      handler(to) {
        if (to) this.$router.push({ path: '/projects' });
      },
      immediate: true,
    },
  },
};
</script>
