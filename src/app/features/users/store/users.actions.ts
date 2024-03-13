import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../models/user';

export const UsersActions = createActionGroup({
  source: 'Users/API',
  events: {
    'Load Users': props<{ users: User[] }>(),
    'Add User': props<{ user: User }>(),
    'Upsert User': props<{ user: User }>(),
    'Add Users': props<{ users: User[] }>(),
    'Upsert Users': props<{ users: User[] }>(),
    'Update User': props<{ user: Update<User> }>(),
    'Update Users': props<{ users: Update<User>[] }>(),
    'Delete User': props<{ id: string }>(),
    'Delete Users': props<{ ids: string[] }>(),
    'Clear Users': emptyProps(),
  },
});
