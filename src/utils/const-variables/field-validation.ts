export interface IValidation {
  rule: RegExp;
  errorText: string;
}

export const LOGIN_VALIDATION: IValidation = {
  rule: /^(?=[a-zA-Z\d_-]{3,20}$)(?!\s)(?=.*[a-zA-Z]+).*$/,
  errorText:
    'Incorrect login (must contain minimum 3\u00A0characters, maximum 20\u00A0characters, may contain numbers, -\u00A0or _\u00A0signs, spaces are not allowed)',
};

export const LOGIN_SEARCH_VALIDATION: IValidation = {
  rule: /(.*?)/,
  errorText: '',
};

export const PASSWORD_VALIDATION: IValidation = {
  rule: /^(?=.{8,40}$)(?=.*[A-Z])(?=.*\d).*$/,
  errorText:
    'Password must contain minimum 8\u00A0characters, maximum 40\u00A0characters, at least 1\u00A0uppercase letter and 1\u00A0number',
};

export const EMAIL_VALIDATION: IValidation = {
  rule: /[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,4}$/,
  errorText: 'Invalid email',
};

export const FIRST_NAME_VALIDATION: IValidation = {
  rule: /^[A-ZА-Я][a-zа-яA-ZА-Я-]+$/,
  errorText:
    'Must start with upper case, must contain only letters or -\u00A0sign',
};

export const LAST_NAME_VALIDATION: IValidation = FIRST_NAME_VALIDATION;

export const CHAT_NAME_VALIDATION: IValidation = FIRST_NAME_VALIDATION;

export const PHONE_NUMBER_VALIDATION: IValidation = {
  rule: /^[+]?\d{10,15}$/,
  errorText:
    'Invalid phone number (must contain 10-15\u00A0characters, may start with a plus sign)',
};

export const MESSAGE_VALIDATION = {
  rule: /(?!^$)(\S)/,
  errorText: 'Should not be empty',
};

export const DEFAULT_FORM_ERROR_MESSAGE = 'Something went wrong...';
