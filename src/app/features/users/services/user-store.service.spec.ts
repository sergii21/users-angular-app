import { TestBed } from '@angular/core/testing';

import { UserStoreService } from './user-store.service';
import { provideStore } from '@ngrx/store';
import { MockUser, MockUsers } from '../consts/mock-users';
import { of } from 'rxjs';

export const userStoreServiceObj = {
  selectUsers: of(MockUsers),
  selectCurrentUser: of(MockUser),
  selectIsFormVisible: of(true),
  loadUsers: undefined,
  create: undefined,
  save: undefined,
  createButtonClick: undefined,
  userClick: undefined,
  delete: undefined,
};

export const userStoreServiceSpy = jasmine.createSpyObj<UserStoreService>(
  'UserStoreService',
  userStoreServiceObj

);

describe('UserStoreService', () => {
  let service: UserStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideStore()
      ]
    });
    service = TestBed.inject(UserStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
