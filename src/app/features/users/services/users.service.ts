import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const USER_NAMES = ['Serhii', 'Vadym'];

@Injectable({ providedIn: 'root' })
export class UsersService {
  isUserNameTaken(userName: string): Observable<boolean> {
    const isTaken = USER_NAMES.includes(userName);

    return of(isTaken);
  }
}
