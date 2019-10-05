import MakeProject from '../dataLogic/MakeProject';
import LocalStorageController from './LocalStorageController';
import RemoteStorageController from './RemoteStorageController';

const ProjectsController = () => {
  const local = LocalStorageController();
  let remote = null;
  const data = { current: null, recents: [] };

  const loadRemote = async (googleApi) => {
    if (remote) return false;
    remote = RemoteStorageController(googleApi);
    const syncOps = [];
    local.read().forEach(async (p) => {
      syncOps.push(remote.syncProject(p));
    });
    const newers = await Promise.all(syncOps);
    newers.forEach((newer) => {
      if (newer) local.update(newer);
    });
    return true;
  };

  const unloadRemote = () => {
    remote = null;
  };

  const listAll = () => remote.listAll();


  const loadP0 = () => {
    const dump = local.read()[0];
    data.current = (dump) ? MakeProject(dump) : MakeProject({});
  };

  const loadRecents = () => {
    data.recents = local.read().filter(p => p.id !== data.current.id);
  };

  const create = () => {
    if (remote) {
      const locals = local.read();
      if (locals.length === 3) remote.syncProject(locals[2]);
    }
    const project = MakeProject({});
    local.update(project.save());
    data.current = project;
    loadRecents();
  };

  const save = async () => {
    const dump = data.current.save();
    local.update(dump);
    if (remote) await remote.syncProject(dump);
    return true;
  };

  const load = async (pId) => {
    if (!pId) {
      loadP0();
    } else {
      let dump = local.read().find(p => p.id === pId);
      if (!dump && remote) {
        dump = await remote.loadProject(pId);
      }
      if (dump) {
        data.current = MakeProject(dump);
      } else {
        return false;
      }
    }
    loadRecents();
    return true;
  };

  load();

  return {
    loadRemote,
    unloadRemote,
    data,
    listAll,
    create,
    save,
    load,
  };
};

export default ProjectsController;
