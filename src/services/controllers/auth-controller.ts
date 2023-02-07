import { AuthApi } from '../../utils/api/auth-api';
import {
  generateFormObject,
  validateRegisterFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../../components/input/input';
import { IPageState } from '../../utils/base-components/page-form';
import { Store } from '../../utils/store/store';

export class AuthController {
  authApi = new AuthApi();
  store = Store.getInstance();

  public async getUser() {
    try {
      const response = await this.authApi.getUser();
      this.store.set('user', JSON.parse(response.data));
    } catch (e) {
      console.error('Get User error:', e);
      throw e;
    }
  }

  public async signIn(inputs: Array<IInputProps>): Promise<IPageState> {
    const formState = validateRegisterFormInputs(inputs);
    if (!formState.isValid) {
      return formState;
    }
    try {
      await this.authApi.signIn(generateFormObject(inputs));
      await this.getUser();
    } catch (e) {
      const errorMessage = JSON.parse(e.data).reason;
      if (errorMessage === 'User already in system') {
        await this.logOut();
        return await this.signIn(inputs);
      } else {
        console.error('Sign In error:', e);
        return { isValid: false, errorText: errorMessage };
      }
    }
  }

  public async signUp(inputs: Array<IInputProps>): Promise<IPageState> {
    const formState = validateRegisterFormInputs(inputs);
    if (!formState.isValid) {
      return formState;
    }
    try {
      await this.authApi.signUp(generateFormObject(inputs));
      await this.getUser();
    } catch (e) {
      console.error('Sign Up error:', e);
      return { isValid: false, errorText: JSON.parse(e.data).reason };
    }
  }

  public async logOut() {
    try {
      await this.authApi.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      this.store.set('user', null);
    }
  }
}
