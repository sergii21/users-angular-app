import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormContainerComponent } from './user-form-container.component';
import { UserStoreService } from '../../services/user-store.service';
import { userStoreServiceObj } from '../../services/user-store.service.spec';
import { findEl, setFieldValue } from '../../../../spec-helpers/element.spec-helper';
import {
  email,
  firstName,
  lastName,
  password,
  repeatPassword,
  type,
  userData,
  username,
} from '../../../../spec-helpers/user-form.spec-helper';

describe('UserFormContainerComponent', () => {
  let component: UserFormContainerComponent;
  let fixture: ComponentFixture<UserFormContainerComponent>;
  let service: jasmine.SpyObj<UserStoreService>;

  const setup = async (
    serviceReturnValues?: jasmine.SpyObjMethodNames<UserStoreService>
  ) => {
    service = jasmine.createSpyObj<UserStoreService>('UserStoreService', {
      ...userStoreServiceObj,
      ...serviceReturnValues,
    });

    await TestBed.configureTestingModule({
      imports: [UserFormContainerComponent],
      providers: [
        {
          provide: UserStoreService,
          useValue: service,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const fillForm = () => {
    setFieldValue(fixture, 'username', username);
    setFieldValue(fixture, 'firstName', firstName);
    setFieldValue(fixture, 'lastName', lastName);
    setFieldValue(fixture, 'email', email);
    setFieldValue(fixture, 'type', type);
    setFieldValue(fixture, 'password', password);
    setFieldValue(fixture, 'repeatPassword', repeatPassword);
  };

  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  it('should submit form successfully', async () => {
    await setup();
    fillForm();
    findEl(fixture, 'form').triggerEventHandler('submit', {});
    expect(service.save).toHaveBeenCalledWith(userData);
  });
});
