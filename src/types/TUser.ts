export type TUserRegistration = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TUserLogin = {
  email: string;
  password: string;
};
