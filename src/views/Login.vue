<template>
  <v-container fill-height>
    <v-row align-content="center" justify="center" style="height:100%;">
      <v-col cols="12" class="text-center">
        <v-card tile max-width="480" color="#eeeeee" style="margin: 0 auto;">
          <v-toolbar color="#424242" dark flat>
            <v-toolbar-title class="ttl">
              Sign In Required
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="py-4 pb-8" style="color: #212121;">
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
            <p class="ttl">
              <!-- eslint-disable-next-line -->
              Signning in with your Google account will verify and create a user collection in the demo Firestore. The only information the signin provide to this app is validation of your email address. No private information will be collected.
            </p>
            <p class="ttl mb-4">
              <!-- eslint-disable-next-line -->
              However, any project and task saved in the database is stored in plain text. I will be able to see everything in the Firebase admin console. Do not store anything in the demo database that you don't want public. Create a build using your own database for data security. Data encryption maybe added in the future, create an issue on Github if you want to contribute and make it happen.
            </p>
            <v-btn
              light
              :disabled="user === undefined || !!user || !networkOnLine"
              data-test="login-btn"
              large
              class="ttl"
              @click="login"
            >
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
