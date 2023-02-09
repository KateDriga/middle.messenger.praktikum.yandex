import { BASE_URL } from '../utils/const-variables/api';

enum HttpTransportMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IOptions<T> {
  data?: T;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}

interface IOptionsWithMethod<T> extends IOptions<T> {
  method: HttpTransportMethods;
}

export interface IResponse {
  status: number;
  data: string;
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
  private readonly _apiUrl: string;

  constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  get<T extends Record<string, unknown>>(
    path: string,
    options: IOptions<T> = {}
  ): Promise<IResponse> {
    return this.request(
      options.data ? queryStringify(options.data) : path,
      { ...options, method: HttpTransportMethods.GET },
      options.timeout
    );
  }

  post<T>(path: string, options: IOptions<T> = {}): Promise<IResponse> {
    return this.request(
      path,
      { ...options, method: HttpTransportMethods.POST },
      options.timeout
    );
  }

  put<T>(path: string, options: IOptions<T> = {}): Promise<IResponse> {
    return this.request(
      path,
      { ...options, method: HttpTransportMethods.PUT },
      options.timeout
    );
  }

  delete<T>(path: string, options: IOptions<T> = {}): Promise<IResponse> {
    return this.request(
      path,
      { ...options, method: HttpTransportMethods.DELETE },
      options.timeout
    );
  }

  request<T>(
    path: string,
    options: IOptionsWithMethod<T> = { method: HttpTransportMethods.GET },
    timeout = 5000
  ): Promise<IResponse> {
    const { method, data, headers = {}, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${BASE_URL}${this._apiUrl}${path}`);

      xhr.withCredentials = withCredentials;

      if (!('Content-Type' in headers) && !(data instanceof FormData)) {
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
        xhr.send(data instanceof FormData ? data : JSON.stringify(data));
      }
    });
  }
}
