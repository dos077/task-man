<template>
  <v-container fill-height>
    <v-row align-content="center" justify="center" style="height:100%;">
      <v-col cols="12" class="text-center">
        <v-card max-width="480" style="margin: 0 auto;">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>
              Please Sign In
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-4 pb-8">
            <!-- Loader -->
            <v-alert v-show="user === undefined" color="info">
              Authenticating...
            </v-alert>

            <!-- Offline instruction -->
            <v-alert
              v-show="!networkOnLine"
              data-test="offline-instruction"
              color="error"
            >
              Please check your connection, login feature is not available
              offline.
            </v-alert>

            <v-alert v-show="loginError" color="error">{{
              loginError
            }}</v-alert>
            <!-- Auth UI -->
            <v-btn
              light
              :disabled="user === undefined || !!user || !networkOnLine"
              data-test="login-btn"
              large
              @click="login"
            >
              <v-icon>mdi-google</v-icon>
              <span class="px-2">Sign in with google</span>
            </v-btn>
            <v-spacer />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import firebase from 'firebase/app';

export default {
  data: () => ({ loginError: null }),
  head() {
    return {
      title: {
        inner: 'Login',
      },
      meta: [
        {
          name: 'description',
          content: `Sign in or sign up to ${this.appTitle}`,
          id: 'desc',
        },
      ],
    };
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle']),
  },
  watch: {
    user: {
      handler(user) {
        if (!(user == null)) {
          const redirectUrl = (this.$route.query.redirectUrl == null)
            ? '/projects'
            : this.$route.query.redirectUrl;
          this.$router.push(redirectUrl);
        }
      },
      immediate: true,
    },
  },
  methods: {
    ...mapMutations('authentication', ['setUser']),
    async login() {
      this.loginError = null;
      const provider = new firebase.auth.GoogleAuthProvider();
      this.setUser(undefined);
      try {
        // Firebase signin with popup is faster than redirect
        // but we can't use it on mobile because it's not well supported
        // when app is running as standalone on ios & android
        // eslint-disable-next-line no-unused-expressions
        this.$vuetify.mobile
          ? await firebase.auth().signInWithRedirect(provider)
          : await firebase.auth().signInWithPopup(provider);
      } catch (err) {
        this.loginError = err;
        this.setUser(null);
      }
    },
  },
};
</script>
