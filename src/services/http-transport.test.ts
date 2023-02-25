import { HTTPTransport, HttpTransportMethods } from './http-transport';

describe('Http Transport Tests', () => {
  it('should send get request', () => {
    const apiUrl = '/api/path';
    const getPath = '/get/path';
    const httpTransport = new HTTPTransport(apiUrl);
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() => Promise.resolve({ status: 200, data: '' }));
    httpTransport.get(getPath);
    expect(httpTransport.request).toBeCalledWith(
      getPath,
      {
        method: HttpTransportMethods.GET,
      },
      undefined
    );
  });
  it('should send get request with query params', () => {
    const apiUrl = '/api/path';
    const getPath = '/get/path';
    const timeout = 3000;
    const options = { data: { offset: 0, limit: 100, title: 'name' }, timeout };
    const httpTransport = new HTTPTransport(apiUrl);
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() => Promise.resolve({ status: 200, data: '' }));
    httpTransport.get(getPath, options);
    expect(httpTransport.request).toBeCalledWith(
      getPath +
        `?offset=${options.data.offset}&limit=${options.data.limit}&title=${options.data.title}`,
      { ...options, method: HttpTransportMethods.GET },
      timeout
    );
  });
  it('should send post request', () => {
    const apiUrl = '/api/path';
    const postPath = '/post/path';
    const title = 'New Chat';
    const timeout = 3000;
    const options = { data: { title }, timeout };
    const httpTransport = new HTTPTransport(apiUrl);
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() => Promise.resolve({ status: 200, data: '' }));
    httpTransport.post(postPath, options);
    expect(httpTransport.request).toBeCalledWith(
      postPath,
      { ...options, method: HttpTransportMethods.POST },
      timeout
    );
  });
  it('should send put request', () => {
    const apiUrl = '/api/path';
    const putPath = '/put/path';
    const formData = new FormData();
    formData.append(
      'file',
      new File(['foo'], 'foo.txt', {
        type: 'text/plain',
      })
    );
    const timeout = 5000;
    const options = { data: formData, timeout };
    const httpTransport = new HTTPTransport(apiUrl);
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() => Promise.resolve({ status: 200, data: '' }));
    httpTransport.put(putPath, options);
    expect(httpTransport.request).toBeCalledWith(
      putPath,
      { ...options, method: HttpTransportMethods.PUT },
      timeout
    );
  });
  it('should send delete request', () => {
    const apiUrl = '/api/path';
    const deletePath = '/delete/path';
    const chat_id = '123';
    const timeout = 3000;
    const options = { data: { chat_id }, timeout };
    const httpTransport = new HTTPTransport(apiUrl);
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() => Promise.resolve({ status: 200, data: '' }));
    httpTransport.delete(deletePath, options);
    expect(httpTransport.request).toBeCalledWith(
      deletePath,
      { ...options, method: HttpTransportMethods.DELETE },
      timeout
    );
  });
  it('should resolve if code is 200 (<400)', () => {
    const apiUrl = '/api/path';
    const postPath = '/post/path';
    const title = 'New Chat';
    const timeout = 3000;
    const options = { data: { title }, timeout };
    const httpTransport = new HTTPTransport(apiUrl);
    const status = 200;
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() =>
        Promise.resolve({ status, data: '{"id":5233}' })
      );
    httpTransport
      .post(postPath, options)
      .then(res => expect(res.status).toBe(status));
  });
  it('should resolve if code is 302 (<400)', () => {
    const apiUrl = '/api/path';
    const getPath = '/get/path';
    const httpTransport = new HTTPTransport(apiUrl);
    const status = 302;
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() =>
        Promise.resolve({ status, data: '{"id":5233, "title":"Title"}' })
      );
    httpTransport.get(getPath).then(res => expect(res.status).toBe(status));
  });
  it('should reject if code >=400', () => {
    const apiUrl = '/api/path';
    const postPath = '/post/path';
    const status = 400;
    const httpTransport = new HTTPTransport(apiUrl);
    jest
      .spyOn(httpTransport, 'request')
      .mockImplementation(() =>
        Promise.reject({ status, data: '{"reason":"Title required"}' })
      );
    jest.spyOn(global.console, 'error');
    httpTransport.post(postPath).catch(res => expect(res.status).toBe(status));
  });
});
