import { BASE_URL } from '../utils/const-variables/api';

enum HttpTransportMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum HttpTransportPaths {
  AUTH_SIGN_UP = '/auth/signup',
  AUTH_SIGN_IN = '/auth/signin',
}

interface IOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
}

interface IOptionsWithMethod extends IOptions {
  method: HttpTransportMethods;
}

export interface IResponse {
  status: number;
  data: Record<string, unknown>;
}

function queryStringify(data: Record<string, unknown>): string {
  return Object.keys(data).reduce(
    (acc, key, idx) => (acc += `${idx === 0 ? '?' : '&'}${key}=${data[key]}`),
    ''
  );
}

function generateResponseStructure(xhr: XMLHttpRequest): IResponse {
  return {
    status: xhr.status,
    data: xhr.response,
  };
}

export class HTTPTransport {
  get(path: HttpTransportPaths, options: IOptions = {}): Promise<IResponse> {
    return this.request(
      options.data ? queryStringify(options.data) : path,
      { ...options, method: HttpTransportMethods.GET },
      options.timeout
    );
  }

  post(path: HttpTransportPaths, options: IOptions = {}): Promise<IResponse> {
    return this.request(
      path,
      { ...options, method: HttpTransportMethods.POST },
      options.timeout
    );
  }

  put(path: HttpTransportPaths, options: IOptions = {}): Promise<IResponse> {
    return this.request(
      path,
      { ...options, method: HttpTransportMethods.PUT },
      options.timeout
    );
  }

  delete(path: HttpTransportPaths, options: IOptions = {}): Promise<IResponse> {
    return this.request(
      path,
      { ...options, method: HttpTransportMethods.DELETE },
      options.timeout
    );
  }

  request(
    path: string,
    options: IOptionsWithMethod = { method: HttpTransportMethods.GET },
    timeout = 5000
  ): Promise<IResponse> {
    const { method, data, headers = {} } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${BASE_URL}${path}`);

      if (!('Content-Type' in headers)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      Object.keys(headers).forEach(key =>
        xhr.setRequestHeader(key, headers[key])
      );

      xhr.onload = function () {
        xhr.status >= 400
          ? reject(generateResponseStructure(xhr))
          : resolve(generateResponseStructure(xhr));
      };

      const handleError = err => {
        console.error(`Error sending ${method} request: ${err}`);
        reject(xhr);
      };

      xhr.timeout = timeout;
      xhr.onabort = handleError;
      xhr.onerror = handleError;
      xhr.ontimeout = handleError;

      if (method === HttpTransportMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
