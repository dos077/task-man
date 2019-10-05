import GDriveController from '../gapi/gdrive';

const RemoteStorageController = (googleApi, folderName = 'task-man-files') => {
  const drive = GDriveController(googleApi);
  let indexId;
  let projects;
  let folderId;

  const mainFolder = async () => {
    if (folderId) return folderId;
    folderId = await drive.find(folderName);
    if (!folderId) folderId = await drive.create(folderName, 'application/vnd.google-apps.folder');
    return folderId;
  };

  const listAll = async () => {
    if (projects) return projects;
    indexId = await drive.find('index.json', await mainFolder());
    if (!indexId) {
      indexId = await drive.create('index.json', 'application/json', await mainFolder());
      projects = [];
      await drive.upload(indexId, projects);
    } else {
      projects = await drive.download(indexId);
    }
    return projects;
  };

  const newProject = async (project) => {
    const fileId = await drive.create(
      `${project.title}.json`,
      'application/json',
      await mainFolder(),
    );
    drive.upload(fileId, project);
    const pFile = {
      title: project.title,
      id: project.id,
      updated: project.updated,
      fileId,
    };
    projects.push(pFile);
    drive.upload(indexId, projects);
  };

  const loadProject = async (id, fileId) => {
    const projectFileId = fileId || (await listAll()).find(p => p.id === id);
    if (!projectFileId) return null;
    return JSON.parse(await drive.download(projectFileId));
  };

  const syncProject = async (project) => {
    const pFile = (await listAll()).find(p => p.id === project.id);
    if (!pFile) {
      newProject(project);
    } else if (pFile.updated < project.updated) {
      if (project.title !== pFile.title) {
        pFile.title = project.title;
        await drive.update(pFile.fileId, `${project.title}.json`);
      }
      await drive.upload(pFile.fileId, project);
      pFile.updated = project.updated;
      drive.upload(indexId, projects);
    } else if (pFile.updated > project.updated) {
      return loadProject(null, pFile.fileId);
    }
    return null;
  };


  return { listAll, syncProject, loadProject };
};

export default RemoteStorageController;
