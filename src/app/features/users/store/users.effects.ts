import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

@Injectable()
export class UsersEffects {
  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      exhaustMap(({ user }) =>
        this.usersService.create(user).pipe(
          map((createdUser) => {
            this.toastr.success('Create user success');
            return UsersActions.addUserSuccess({ user: createdUser });
          }),
          catchError((error) => of(UsersActions.serverError({ error })))
        )
      )
    );
  });

  save$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      exhaustMap(({ user }) =>
        this.usersService.update(user.changes as User).pipe(
          map(() => {
            this.toastr.success('Save user success');
            return UsersActions.updateUserSuccess({ user });
          }),
          catchError((error) => of(UsersActions.serverError({ error })))
        )
      )
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      exhaustMap(({ id }) =>
        this.usersService.delete(id).pipe(
          map(() => {
            this.toastr.success('Delete user success');
            return UsersActions.deleteUserSuccess({ id });
          }),
          catchError((error) => of(UsersActions.serverError({ error })))
        )
      )
    );
  });

  serverError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UsersActions.serverError),
        map(({ error }) => this.toastr.error(error))
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private toastr: ToastrService,
    private usersService: UsersService
  ) {}
}
