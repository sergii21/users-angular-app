import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UsersState } from '../store/users.reducer';
import { Store } from '@ngrx/store';
import { UserSelectors, UserViewSelectors } from '../store';
import { UsersActions } from '../store/users.actions';
import { MockUsers } from '../consts/mock-users';
import { UserViewActions } from '../store/user-view.actions';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private store: Store<UsersState>) {}

  selectUsers(): Observable<User[]> {
    return this.store.select(UserSelectors.selectAll);
  }

  selectCurrentUser(): Observable<User> {
    return this.store.select(UserViewSelectors.selectCurrentUser);
  }

  selectIsFormVisible(): Observable<boolean> {
    return this.store.select(UserViewSelectors.selectIsFormVisible);
  }

  loadUsers() {
    this.store.dispatch(UsersActions.loadUsers({ users: MockUsers }));
  }

  createButtonClick() {
    this.store.dispatch(UserViewActions.createButtonClick());
  }

  userClick(user: User) {
    this.store.dispatch(UserViewActions.userClick({ id: user.id }));
  }

  delete(user: User) {
    this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
  }
  create(user: User) {
    this.store.dispatch(UsersActions.addUser({ user }));
  }
  save(user: User) {
    this.store.dispatch(UsersActions.updateUser({ user: { id: user.id, changes: user } }));
  }
}
