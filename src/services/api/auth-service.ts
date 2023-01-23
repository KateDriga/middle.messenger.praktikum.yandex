import {
  HTTPTransport,
  HttpTransportPaths,
  IResponse,
} from '../http-transport';

export class AuthService {
  httpTransport = new HTTPTransport();
  async signUp(data: Record<string, string>): Promise<IResponse> {
    return await this.httpTransport.post(HttpTransportPaths.AUTH_SIGN_UP, {
      data,
    });
  }

  async signIn(data: Record<string, string>): Promise<IResponse> {
    return await this.httpTransport.post(HttpTransportPaths.AUTH_SIGN_IN, {
      data,
    });
  }
}
