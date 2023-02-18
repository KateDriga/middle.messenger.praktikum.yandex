import { AuthApi } from '../../utils/api/auth-api';
import {
  generateFormObject,
  validateFormInputs,
  validateRegisterFormInputs,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { IInputProps } from '../../components/input/input';
import { IPageState } from '../../utils/base-components/page-form';
import { Store } from '../../utils/store/store';
import { handleFormErrors } from '../../utils/util-functions/api/handle-errors';

export class AuthController {
  private authApi = new AuthApi();
  private store = Store.getInstance();

  public async getUser() {
    try {
      this.store.set('loadingState.userIsLoading', true);
      const response = await this.authApi.getUser();
      this.store.set('user', JSON.parse(response.data));
    } catch (e) {
      console.error('Get User error:', e);
      throw e;
    } finally {
      this.store.set('loadingState.userIsLoading', false);
    }
  }

  public async signIn(inputs: Array<IInputProps>): Promise<IPageState> {
    const formState = validateFormInputs(inputs);
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
        return handleFormErrors(e, 'Sign In');
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
      return handleFormErrors(e, 'Sign Up');
    }
  }

  public async logOut() {
    try {
      await this.authApi.logout();
    } catch (e) {
      console.error('Logout error:', e);
    } finally {
      this.store.resetState();
    }
  }
}
