const BuildReq = (googleApi) => {
  const getBaseUrl = 'https://www.googleapis.com/drive/v3/files';
  const postBaseUrl = 'https://www.googleapis.com/upload/drive/v3/files';

  const getToken = () => `Bearer ${googleApi.auth.getToken().access_token}`;

  const buildOptions = (method, body) => {
    const options = {
      method,
      headers: {
        Authorization: getToken(),
        'Content-Type': 'application/json',
      },
    };
    if (body) options.body = JSON.stringify(body);
    return options;
  };

  const find = ({ name, mimeType, parentId }) => {
    let q = `name='${name}'`;
    if (mimeType) q += ` and mimeType='${mimeType}'`;
    if (parentId) q += ` and '${parentId}' in parents`;
    const url = `${getBaseUrl}?q=${q}`;
    const options = buildOptions('GET');
    return { url, options };
  };

  const create = ({ name, mimeType, parentId }) => {
    const fileMetadata = { name, mimeType };
    if (parentId) fileMetadata.parents = [parentId];
    const url = `${getBaseUrl}`;
    const options = buildOptions('POST', fileMetadata);
    return { url, options };
  };

  const update = ({ fileId, name }) => {
    const fileMetadata = { name };
    const url = `${getBaseUrl}/${fileId}`;
    const options = buildOptions('PATCH', fileMetadata);
    return { url, options };
  };

  const upload = ({ fileId, content }) => {
    const url = `${postBaseUrl}/${fileId}?uploadType=media`;
    const options = buildOptions('PATCH', content);
    return { url, options };
  };

  const download = ({ fileId }) => {
    const url = `${getBaseUrl}/${fileId}?alt=media`;
    const options = buildOptions('GET');
    return { url, options };
  };

  const destroy = ({ fileId }) => {
    const url = `${getBaseUrl}/${fileId}`;
    const options = buildOptions('DELETE');
    return { url, options };
  };

  return {
    find, create, update, upload, download, destroy,
  };
};

export default BuildReq;
