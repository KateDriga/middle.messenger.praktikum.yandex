import { InputNameTypes } from '../../components/input/input';

export type TUser = {
  [key in InputNameTypes as string]: string;
};

export const USER: TUser = {
  [InputNameTypes.EMAIL]: 'user-email@test.com',
  [InputNameTypes.LOGIN]: 'ivanivanov',
  [InputNameTypes.FIRST_NAME]: 'Ivan',
  [InputNameTypes.SECOND_NAME]: 'Ivanov',
  [InputNameTypes.PHONE]: '+79991234567',
  [InputNameTypes.DISPLAY_NAME]: 'Mega',
  [InputNameTypes.PASSWORD]: '',
};
