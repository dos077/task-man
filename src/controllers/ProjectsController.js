import MakeProject from '../dataLogic/MakeProject';
import LocalStorageController from './LocalStorageController';
import RemoteStorageController from './RemoteStorageController';

const ProjectsController = () => {
  const local = LocalStorageController();
  let remote = null;
  const data = { current: null, recents: [], syncing: false };

  const loadRemote = async (googleApi) => {
    if (remote) return false;
    data.syncing = true;
    remote = await RemoteStorageController(googleApi);
    const syncOps = [];
    local.read().forEach(async (p) => {
      syncOps.push(remote.syncProject(p));
    });
    const newers = await Promise.all(syncOps);
    newers.forEach((newer) => {
      if (newer) local.update(newer);
    });
    data.syncing = false;
    return true;
  };

  const unloadRemote = () => {
    remote = null;
  };

  const listAll = () => {
    if (remote) return remote.listAll();
    return [];
  };

  const loadP0 = () => {
    const dump = local.read()[0];
    data.current = (dump) ? MakeProject(dump) : MakeProject({});
  };

  const loadRecents = () => {
    data.recents = local.read();
  };

  const create = () => {
    const project = MakeProject({});
    local.update(project.save());
    data.current = project;
    loadRecents();
  };

  const save = async () => {
    const dump = data.current.save();
    local.update(dump);
    if (remote) {
      data.syncing = true;
      await remote.syncProject(dump);
      data.syncing = false;
    }
    loadRecents();
    return true;
  };

  const destroy = async (pId) => {
    local.destroy(pId);
    data.syncing = true;
    await remote.destroy(pId);
    data.syncing = false;
    loadRecents();
  };

  const load = async (pId) => {
    if (!pId) {
      loadP0();
    } else {
      let dump = local.read().find(p => p.id === pId);
      if (!dump && remote) {
        data.syncing = true;
        dump = await remote.loadProject(pId);
        data.syncing = false;
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
    destroy,
  };
};

export default ProjectsController;
