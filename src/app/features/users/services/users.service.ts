import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

const USER_NAMES = ['Serhii', 'Vadym'];

@Injectable({ providedIn: 'root' })
export class UsersService {
  create(user: User): Observable<User> {
    return of({ ...user, id: Math.random() });
  }

  update(user: User): Observable<User> {
    return of(user);
  }

  delete(id: number): Observable<number> {
    return of(id);
  }

  isUserNameTaken(userName: string): Observable<boolean> {
    const isTaken = USER_NAMES.includes(userName);
    return of(isTaken);
  }
}
