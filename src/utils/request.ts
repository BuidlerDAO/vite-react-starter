interface RequestOptions extends RequestInit {
  responseType?:
    | 'TEXT'
    | 'JSON'
    | 'BLOB'
    | 'ARRAYBUFFER'
    | 'text'
    | 'json'
    | 'blob'
    | 'arraybuffer';
  body?: any;
}

const inital: RequestOptions = {
  method: 'GET',
  body: null,
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include',
  cache: 'no-cache',
  responseType: 'JSON'
};

// 发送数据请求
const request = async (url: string, config?: RequestOptions) => {
  const finalUrl: string = url;
  const configs: RequestOptions = { ...inital, ...config };
  if (config && config.headers)
    configs.headers = { ...inital.headers, ...config.headers };

  // body
  if (
    configs.body &&
    /^(POST|PUT|PATCH)$/i.test(configs.method?.toUpperCase() || '') &&
    configs.responseType &&
    configs.responseType.toUpperCase() === 'JSON'
  ) {
    configs.body = JSON.stringify({ ...configs.body });
  }

  // 基于fetch请求数据
  const finalConfig: RequestInit = {
    method: configs.method?.toUpperCase(),
    credentials: configs.credentials,
    cache: configs.cache,
    headers: configs.headers,
    body: configs.body
  };

  return fetch(`${finalUrl}`, finalConfig)
    .then((response: Response) => {
      // 走到这边不一定是成功的：
      // Fetch的特点的是，只要服务器有返回结果，不论状态码是多少，它都认为是成功
      const { status, statusText } = response;

      if (status >= 200 && status < 400) {
        // 真正成功获取数据
        let result: any;
        switch (configs.responseType && configs.responseType.toUpperCase()) {
          case 'TEXT':
            result = response.text();
            break;
          case 'JSON':
            result = response.json();
            break;
          case 'BLOB':
            result = response.blob();
            break;
          case 'ARRAYBUFFER':
            result = response.arrayBuffer();
            break;
          default:
            result = response.json();
        }
        return result;
      }
      // 应该是失败的处理
      throw new Error(`${status} ${statusText}`);
    })
    .catch((reason: any) => {
      // @1:状态码失败
      if (reason && reason.code === 'STATUS ERROR') {
        switch (reason.status) {
          case 401:
            break;
          default:
        }
      }

      // @2:断网
      if (typeof window !== 'undefined' && navigator && !navigator.onLine) {
        // ...
      }

      // @3:处理返回数据格式失败
      // ...

      return Promise.reject(reason);
    });
};

export default request;
