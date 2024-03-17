import { Observable } from 'rxjs';

export interface FakeUsersService {
  isUserNameTaken: (userName: string) => Observable<boolean>;
}
