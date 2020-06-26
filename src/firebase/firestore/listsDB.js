import GenericDB from './genericDB';

export default (userId, projectId) => {
  const userPath = `users/${userId}`;
  const projectPath = `projects/${projectId}`;
  return GenericDB(`${userPath}/${projectPath}/lists`);
};
