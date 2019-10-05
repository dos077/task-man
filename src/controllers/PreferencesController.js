const Prefs = () => {
  const saves = localStorage.taskManPrefs;

  const {
    sort, onLine,
  } = (saves) ? JSON.parse(saves) : {
    sort: 'date',
    onLine: false,
  };

  const data = { sort, onLine };

  const save = () => {
    localStorage.taskManPrefs = JSON.stringify(data);
  };

  const handler = {
    set(target, property, value) {
      Reflect.set(target, property, value);
      if (['sort', 'onLine'].includes(property)) save();
      return Reflect.set(target, property, value);
    },
  };

  const watched = new Proxy(data, handler);

  return watched;
};

export default Prefs;
