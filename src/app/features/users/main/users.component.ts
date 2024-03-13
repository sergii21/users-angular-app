import { Component, OnInit } from '@angular/core';
import { UserTableContainerComponent } from '../components/user-table-container/user-table-container.component';
import { UserFormContainerComponent } from '../components/user-form-container/user-form-container.component';
import { UserStoreService } from '../services/user-store.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UserTableContainerComponent,
    UserFormContainerComponent,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  isFormVisible$!: Observable<boolean>;
  constructor(private userStoreService: UserStoreService) {}
  ngOnInit(): void {
    this.isFormVisible$ = this.userStoreService.selectIsFormVisible();
    this.userStoreService.loadUsers();
  }
  onCreate() {
    this.userStoreService.createButtonClick();
  }
}
