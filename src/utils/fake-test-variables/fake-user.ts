export interface IUser {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  phone: string;
  chatName: string;
  password: string;
}

export const USER: IUser = {
  email: 'user-email@test.com',
  login: 'ivanivanov',
  firstName: 'Ivan',
  lastName: 'Ivanov',
  phone: '+79991234567',
  chatName: 'Mega',
  password: '',
};
