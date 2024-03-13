import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent {
  @Input() users: User[] = [];
  @Output() userClick = new EventEmitter<User>();

  trackBy = (index: number, user: User) => user.id;
  onUserClick(user: User) {
    this.userClick.emit(user);
  }
}
