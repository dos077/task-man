const script = document.createElement('script');
script.src = 'https://apis.google.com/js/client.js';

const discoveryDocs = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

const clientId = '1084798610915-ugdr3ivf8b6nqqsba6fb6lm4oeso90af.apps.googleusercontent.com';

const scope = 'profile email https://www.googleapis.com/auth/drive.file';

export default {
  script, discoveryDocs, clientId, scope,
};
