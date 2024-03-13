import { UserStoreService } from './../../services/user-store.service';
import { Component, OnInit } from '@angular/core';
import { UserTableComponent } from '../user-table/user-table.component';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-table-container',
  standalone: true,
  imports: [CommonModule, UserTableComponent],
  templateUrl: './user-table-container.component.html',
  styleUrl: './user-table-container.component.scss',
})
export class UserTableContainerComponent implements OnInit {
  users$: Observable<User[]> = of([]);
  constructor(private userStoreService: UserStoreService) {}
  ngOnInit(): void {
    this.users$ = this.userStoreService.selectUsers();
  }
}
