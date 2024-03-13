import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';
import { UserSelectors } from '.';
import { User, newUser } from '../models/user';

export const selectUsersFeature = createFeatureSelector<fromUsers.UsersState>(
  fromUsers.usersesFeatureKey
);

export const selectIsFormVisible = createSelector(
  selectUsersFeature,
  (state) => state.isUserFormVisible
);

export const selectCurrentUser = createSelector(
  selectUsersFeature,
  UserSelectors.selectEntities,
  (state, entities) =>
    (entities ? entities[state.currentUserId] : newUser) as User
);
