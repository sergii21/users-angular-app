import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { Observable, of } from 'rxjs';
import { User, newUser } from '../../models/user';
import { UserStoreService } from '../../services/user-store.service';

@Component({
  selector: 'app-user-form-container',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: './user-form-container.component.html',
  styleUrl: './user-form-container.component.scss',
})
export class UserFormContainerComponent implements OnInit {
  user$: Observable<User> = of(newUser);

  constructor(private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.user$ = this.userStoreService.selectCurrentUser();
  }
  onCreate(user: User) {
    this.userStoreService.create(user);
  }
  onSave(user: User) {
    this.userStoreService.save(user);
  }
  onDelete(user: User) {
    this.userStoreService.delete(user);
  }
}
