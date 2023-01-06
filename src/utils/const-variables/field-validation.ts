export interface IValidation {
  rule: RegExp;
  errorText: string;
}

export const LOGIN_VALIDATION: IValidation = {
  rule: /.{5,50}/,
  errorText: 'Incorrect login (must contain at least 5\u00A0symbols)',
};

export const PASSWORD_VALIDATION: IValidation = {
  rule: /[^\n]+/,
  errorText: '',
};
