import GenericDB from './genericDB';

export default userId => GenericDB(`users/${userId}/projects`);
