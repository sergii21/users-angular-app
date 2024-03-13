import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormContainerComponent } from './user-form-container.component';

describe('UserFormContainerComponent', () => {
  let component: UserFormContainerComponent;
  let fixture: ComponentFixture<UserFormContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
