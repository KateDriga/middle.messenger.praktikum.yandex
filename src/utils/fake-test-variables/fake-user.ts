export interface IUser {
  email: string;
  login: string;
  firstName: string;
  lastName: string;
  phone: {
    code: string;
    number: string;
  };
  chatName: string;
  password: string;
}

export const USER: IUser = {
  email: 'user-email@test.com',
  login: 'ivanivanov',
  firstName: 'Ivan',
  lastName: 'Ivanov',
  phone: {
    code: '+7',
    number: '9991234567',
  },
  chatName: 'Mega',
  password: '',
};
