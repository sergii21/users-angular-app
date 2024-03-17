import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersActions } from './users.actions';
import { catchError, map, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class UsersEffects {
  create$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUser),
      map(({ user }) => {
        this.toastr.success('Create user success');
        return UsersActions.addUserSuccess({ user })
      }),
      catchError((error) => of(UsersActions.serverError({ error })))
    );
  });

  save$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.updateUser),
      map(({ user }) => {
        this.toastr.success('Save user success');
        return UsersActions.updateUserSuccess({ user })
      }),
      catchError((error) => of(UsersActions.serverError({ error })))
    );
  });

  delete$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      map(({ id }) => {
        this.toastr.success('Delete user success');
        return UsersActions.deleteUserSuccess({ id })
      }),
      catchError((error) => of(UsersActions.serverError({ error })))
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

  constructor(private actions$: Actions, private toastr: ToastrService) {}
}
