import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../models/user';

export const UsersActions = createActionGroup({
  source: 'Users/API',
  events: {
    'Load Users': props<{ users: User[] }>(),
    'Add User': props<{ user: User }>(),
    'Add User Success': props<{ user: User }>(),
    'Upsert User': props<{ user: User }>(),
    'Add Users': props<{ users: User[] }>(),
    'Upsert Users': props<{ users: User[] }>(),
    'Update User': props<{ user: Update<User> }>(),
    'Update User Success': props<{ user: Update<User> }>(),
    'Update Users': props<{ users: Update<User>[] }>(),
    'Delete User': props<{ id: number }>(),
    'Delete User Success': props<{ id: number }>(),
    'Delete Users': props<{ ids: number[] }>(),
    'Server Error': props<{ error: string }>(),
    'Clear Users': emptyProps(),
  },
});
