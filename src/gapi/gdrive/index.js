import FetchQueue from './FetchQueue';
import BuildReq from './BuildReq';

const GDriveController = (googleApi) => {
  const queue = FetchQueue();
  const buildReq = BuildReq(googleApi);

  const create = async (name, mimeType, parentId) => {
    const { url, options } = buildReq.create({ name, mimeType, parentId });
    const res = await queue.newFetch({ url, options });
    return res.id;
  };

  const update = async (fileId, name) => {
    const { url, options } = buildReq.update({ fileId, name });
    const res = await queue.newFetch({ url, options });
    return res.name;
  };

  const upload = async (fileId, content) => {
    const { url, options } = buildReq.upload({ fileId, content });
    const res = await queue.newFetch({ url, options });
    return res.id;
  };

  const find = async (name, parentId) => {
    const { url, options } = buildReq.find({ name, parentId });
    const res = await queue.newFetch({ url, options });
    if (res && res.files.length > 0) return res.files[0].id;
    return null;
  };

  const download = async (fileId) => {
    const { url, options } = buildReq.download({ fileId });
    const res = await queue.newFetch({ url, options });
    return res;
  };

  const destroy = async (fileId) => {
    const { url, options } = buildReq.destroy({ fileId });
    const res = await queue.newFetch({ url, options });
    return res;
  };

  return {
    create, update, upload, find, download, destroy,
  };
};

export default GDriveController;
