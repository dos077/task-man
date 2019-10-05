const FetchQueue = (interval = 100, maxRetries = 5) => {
  let delay = 0;

  const wait = async ms => new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

  const newFetch = async ({ url, options, immediate }, tries) => {
    const multiplier = tries || 1;
    if (tries > maxRetries) throw new Error(`max retries reached: ${options.method} ${url}`);
    const waitTime = interval * multiplier + Math.floor(Math.random() * 51);
    delay += waitTime;
    if (!immediate) {
      await wait(delay);
    } else {
      await wait(waitTime);
    }
    delay -= waitTime;
    try {
      const result = await fetch(url, options);
      if (result.status === 200) {
        return await result.json();
      }
      if (result.status === 403) {
        return await newFetch({ url, options, immediate }, multiplier + 1);
      }
      if (result.status === 404) return null;
      throw new Error(`fetch request failed: ${result.status}`);
    } catch (err) {
      if (err.code === 403) {
        const res = await newFetch({ url, options, immediate }, multiplier + 1);
        return res;
      }
      if (err.code === 404) return null;
      throw (err);
    }
  };

  return {
    newFetch,
  };
};

export default FetchQueue;
