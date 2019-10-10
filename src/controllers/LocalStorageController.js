const LocalStorageController = () => {
  const pArr = ['p0', 'p1', 'p2'];

  const read = () => {
    const projects = [];
    for (let i = 0; i < pArr.length; i += 1) {
      if (localStorage[pArr[i]]) projects.push(localStorage[pArr[i]]);
    }
    return projects.map(p => JSON.parse(p));
  };

  const write = (projects) => {
    projects.forEach((p, i) => {
      localStorage[pArr[i]] = JSON.stringify(p);
    });
  };

  const erase = () => {
    pArr.forEach((key) => {
      localStorage.removeItem(key);
    });
  };

  const destroy = (pId) => {
    const projects = read().filter(p => p.id !== pId);
    erase();
    write(projects);
  };

  const update = (project) => {
    const projects = read();
    const i = projects.findIndex(p => p.id === project.id);
    if (i >= 0) projects.splice(i, 1);
    projects.unshift(project);
    write(projects.slice(0, 3));
  };

  return {
    read,
    destroy,
    update,
  };
};

export default LocalStorageController;
