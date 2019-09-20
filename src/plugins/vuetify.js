import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#212121',
        secondary: '#424242',
        accent: '#616161',
        error: '#c62828',
        info: '#dcedc8',
        success: '#b2ebf2',
        warning: '#b71c1c',
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
