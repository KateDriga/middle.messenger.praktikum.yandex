import { HTTPTransport } from '../../services/http-transport';

export class BaseApi {
  protected httpTransport: HTTPTransport;

  protected constructor(apiUrl: string) {
    this.httpTransport = new HTTPTransport(apiUrl);
  }
}
