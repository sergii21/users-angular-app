import { UserType } from '../enum/user-type';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}

export const newUser: User = {
  id: 0,
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  type: '',
};
