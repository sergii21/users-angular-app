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
  mode: 'create' | 'update' = 'create';

  public get isCreateMode(): boolean {
    return this.mode === 'create';
  }
  public get isUpdateMode(): boolean {
    return this.mode === 'update';
  }

  constructor(private fb: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.setMode();
      if (this.userForm) {
        this.patchForm();
      } else {
        this.createForm();
        this.patchForm();
      }
    }
  }

  private setMode() {
    if (this.user?.id) {
      this.mode = 'update';
    } else {
      this.mode = 'create';
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
    this.submitForm.emit({ ...this.user, ...this.userForm.value });
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
