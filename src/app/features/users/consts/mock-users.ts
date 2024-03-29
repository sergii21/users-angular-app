import { User } from '../models/user';

export const MockUser: User = {
  id: 1,
  username: 'serj21',
  firstName: 'Serhii',
  lastName: 'Nahornyi',
  email: 'serjvnet@gmail.com',
  type: 'Admin',
  password: 'www1111111',
  repeatPassword: 'www1111111',
};

export const MockUsers: User[] = [
  { ...MockUser },
  ...Array(10)
    .fill(MockUser)
    .map((i) => ({ ...i, id: Math.random() })),
];
