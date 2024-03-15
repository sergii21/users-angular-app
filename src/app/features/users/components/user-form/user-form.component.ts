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
import { ServerValidationError } from '../../models/server-validation-error';
import { FormSubmitValidationMsgDirective } from '../../../../shared/directives/formsubmit-validation-msg.directive';
import { FormControlValidationMsgDirective } from '../../../../shared/directives/formcontrol-validation-msg.directive';

export const StrongPasswordRegx: RegExp = /^.*(?=.{8,})(?=.*\d)(?=.*[a-zA-Z]).*$/;
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormControlValidationMsgDirective,
    FormSubmitValidationMsgDirective,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnChanges {
  @Input() user!: User;
  @Input() validationErrors!: ServerValidationError[];
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
    if (changes['validationErrors']) {
      this.userForm.setErrors(this.validationErrors);
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
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(StrongPasswordRegx),
        ],
      ],
      repeatPassword: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }
    this.submitForm.emit({ ...this.user, ...this.userForm.value });
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
