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

export const selectCurrentUserId = createSelector(
  selectUsersFeature,
  (state) => state.currentUserId
);

export const selectCurrentUser = createSelector(
  UserSelectors.selectEntities,
  selectCurrentUserId,
  (entities, currentUserId) =>
    (entities[currentUserId] ? entities[currentUserId] : newUser) as User
);
