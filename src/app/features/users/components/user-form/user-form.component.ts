import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User, newUser } from '../../models/user';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  @Input() user: User = newUser;
  @Output() submitForm = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  userForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      if (this.userForm) {
        this.patchForm();
      } else {
        this.createForm();
      }
    }
  }

  patchForm() {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitForm.emit(this.userForm.value());
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
