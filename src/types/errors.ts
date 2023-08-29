export interface SignUpErrors {
  userExists: boolean;
  invalidEmail: boolean;
  emptyEmail: boolean;
  emptyPassword: boolean;
}

export interface LoginErrors {
  invalidEmail: boolean;
  emptyEmail: boolean;
  emptyPassword: boolean;
  accountNotFound: boolean;
  invalidLogin: boolean;
}
