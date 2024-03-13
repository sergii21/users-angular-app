import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableContainerComponent } from './user-table-container.component';

describe('UserTableContainerComponent', () => {
  let component: UserTableContainerComponent;
  let fixture: ComponentFixture<UserTableContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
