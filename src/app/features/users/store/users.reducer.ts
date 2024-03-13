import { createFeature, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UsersActions } from './users.actions';
import { User } from '../models/user';
import { UserViewActions } from './user-view.actions';

export const usersesFeatureKey = 'users';

export interface UsersState extends EntityState<User> {
  // additional entities state properties
  currentUserId: number;
  isUserFormVisible: boolean;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: UsersState = adapter.getInitialState({
  currentUserId: 0,
  isUserFormVisible: false,
});

export const reducer = createReducer(
  initialState,
  on(UsersActions.addUser, (state, action) =>
    adapter.addOne(action.user, state)
  ),
  on(UsersActions.upsertUser, (state, action) =>
    adapter.upsertOne(action.user, state)
  ),
  on(UsersActions.addUsers, (state, action) =>
    adapter.addMany(action.users, state)
  ),
  on(UsersActions.upsertUsers, (state, action) =>
    adapter.upsertMany(action.users, state)
  ),
  on(UsersActions.updateUser, (state, action) =>
    adapter.updateOne(action.user, state)
  ),
  on(UsersActions.updateUsers, (state, action) =>
    adapter.updateMany(action.users, state)
  ),
  on(UsersActions.deleteUser, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(UsersActions.deleteUsers, (state, action) =>
    adapter.removeMany(action.ids, state)
  ),
  on(UsersActions.loadUsers, (state, action) =>
    adapter.setAll(action.users, state)
  ),
  on(UsersActions.clearUsers, (state) => adapter.removeAll(state)),
  on(UserViewActions.createButtonClick, (state) => ({
    ...state,
    isUserFormVisible: true,
  })),
  on(UserViewActions.userClick, (state, action) => ({
    ...state,
    currentUserId: action.id,
  }))
);

export const usersesFeature = createFeature({
  name: usersesFeatureKey,
  reducer,
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const { selectIds, selectEntities, selectAll, selectTotal } =
  usersesFeature;
