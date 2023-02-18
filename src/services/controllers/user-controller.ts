import { UserApi } from '../../utils/api/user-api';
import { Store } from '../../utils/store/store';
import { IInputProps } from '../../components/input/input';
import { IPageState } from '../../utils/base-components/page-form';
import {
  generateFormObject,
  isNewPasswordInput,
  isOldPasswordInput,
  validateChangePasswordFormInputs,
  validateFormInputs,
  validateSearchByLogin,
} from '../../utils/util-functions/form-inputs/form-inputs';
import { AuthController } from './auth-controller';
import { displayModal } from '../../utils/util-functions/modal';
import { handleFormErrors } from '../../utils/util-functions/api/handle-errors';
import { TUser } from '../../components/profile-settings-form/profile-settings-form';

export class UserController {
  private userApi = new UserApi();
  private authController = new AuthController();
  private store = Store.getInstance();

  public async changeProfileSettings(
    inputs: Array<IInputProps>
  ): Promise<IPageState> {
    const formState = validateFormInputs(inputs);
    if (!formState.isValid) {
      return formState;
    }
    if (
      inputs.every(
        input => input.value === this.store.getState().user[input.name]
      )
    ) {
      return { isValid: true, errorText: null };
    }
    try {
      await this.userApi.changeProfileSettings(generateFormObject(inputs));
      await this.authController.getUser();
      displayModal({ type: 'success', message: 'Settings were updated' });
    } catch (e) {
      return handleFormErrors(e, 'Change Profile Settings');
    }
  }

  public async changePassword(inputs: Array<IInputProps>): Promise<IPageState> {
    const formState = validateChangePasswordFormInputs(inputs);
    if (!formState.isValid) {
      return formState;
    }
    try {
      const oldPassword = inputs.find(input => isOldPasswordInput(input));
      const newPassword = inputs.find(input => isNewPasswordInput(input));
      await this.userApi.changePassword(
        generateFormObject([oldPassword, newPassword])
      );
      displayModal({ type: 'success', message: 'Password was changed' });
    } catch (e) {
      return handleFormErrors(e, 'Change Password');
    }
  }

  public async changeAvatar(avatar: File): Promise<IPageState> {
    const formData = new FormData();
    formData.append('avatar', avatar);
    try {
      await this.userApi.changeAvatar(formData);
      await this.authController.getUser();
      displayModal({
        type: 'success',
        message: "You've set a new avatar profile image",
      });
    } catch (e) {
      return handleFormErrors(e, 'Change Avatar');
    }
  }

  public async findUsers(
    login: string
  ): Promise<Array<TUser & { id: string }> | IPageState> {
    const formState = validateSearchByLogin(login);
    if (!formState.isValid) {
      return formState;
    }
    try {
      const response = await this.userApi.findUsers(login);
      return JSON.parse(response.data);
    } catch (e) {
      return handleFormErrors(e, 'Find Users');
    }
  }
}
