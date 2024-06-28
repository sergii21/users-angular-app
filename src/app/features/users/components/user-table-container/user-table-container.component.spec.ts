import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableContainerComponent } from './user-table-container.component';
import { UserStoreService } from '../../services/user-store.service';
import { userStoreServiceSpy } from '../../services/user-store.service.spec';

describe('UserTableContainerComponent', () => {
  let component: UserTableContainerComponent;
  let fixture: ComponentFixture<UserTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableContainerComponent],
      providers: [
        {
          provide: UserStoreService,
          useValue: userStoreServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
