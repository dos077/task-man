# Task-man

## About
A progressive web app for task management in Kanban style. Using Google's firebase cloud store, project boards are saved and synced in realtime across all signed-in devices. Built on Vue.js frontend and Vuetify component library, the code is styled after standard practice for easy modification and customization.

## Demo
[Github Pages](https://dos077.github.io/task-man/)

## Features / What's Working
- realtime cloud sync with Google sign-in(required)
- color coding tasks
- date or priority sorting and grouping of tasks
- drag and drop support for arranging tasks

## Wishlists / What's not Working
- alternative sign-ins(currently Google sign-in is required for using the app)
- offline mode
- calendar view for aggregate tasks view
- data encryption (the database is in plain text)

## Project setup
```
npm install
```

## Firebase setup
Create a new project in [Firebase console](https://console.firebase.google.com/). Enable database and authentication/sign-in method/Google. Add a new web app in setting and save the settings in a .env file in the root of the project, following this template:
```
VUE_APP_FBKEY=#apiKey
VUE_APP_FBDOMAIN=#authDomain
VUE_APP_FBDBURL=#databaseURL
VUE_APP_FBPID=#projectId
VUE_APP_FBBUCKET=#storageBucket
VUE_APP_FBMSID=#messagingSenderId
VUE_APP_APPID=#appId
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
