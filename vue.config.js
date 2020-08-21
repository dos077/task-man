module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : './',
  pwa: {
    name: 'task-man',
    themeColor: '#424242',
  },
};
