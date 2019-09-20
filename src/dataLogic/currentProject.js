import MakeProject from './MakeProject';

const currentProject = (params) => {
  const loadLocal = () => {
    if (localStorage.currentProject) {
      const localSave = JSON.parse(localStorage.currentProject);
      return MakeProject(localSave);
    }
    return MakeProject({});
  };

  const project = (params) ? MakeProject(params) : loadLocal();

  project.saveLocal = () => {
    localStorage.currentProject = JSON.stringify(project.save());
  };

  return project;
};

export default currentProject;
