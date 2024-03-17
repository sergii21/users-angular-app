import { UniqueUserNameValidator } from './../../validators/unique-user.validator';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../models/user';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormControlValidationMsgDirective } from '../../../../shared/directives/formcontrol-validation-msg.directive';
import { FormSubmitValidationMsgDirective } from '../../../../shared/directives/formsubmit-validation-msg.directive';
import { StrongPasswordRegx } from '../../consts/strong-password-regex';
import { repeatPasswordValidator } from '../../validators/repeat-password.validator';

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
  @Output() create = new EventEmitter<User>();
  @Output() save = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();
  userForm!: FormGroup;
  mode: 'create' | 'update' = 'create';

  public get isCreateMode(): boolean {
    return this.mode === 'create';
  }
  public get isUpdateMode(): boolean {
    return this.mode === 'update';
  }

  public get isFormDisabled(): boolean {
    return this.userForm.status === 'PENDING';
  }

  public get password(): AbstractControl {
    return this.userForm.get('password') as AbstractControl;
  }

  public get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword') as AbstractControl;
  }

  constructor(
    private fb: FormBuilder,
    private uniqueUserNameValidator: UniqueUserNameValidator
  ) {}

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
    this.userForm = this.fb.group(
      {
        username: [
          '',
          Validators.required,
          this.uniqueUserNameValidator.validate.bind(
            this.uniqueUserNameValidator
          ),
        ],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(StrongPasswordRegx)],
        ],
        repeatPassword: ['', [Validators.required]],
        type: ['', [Validators.required]],
      },
      { validators: repeatPasswordValidator }
    );
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return;
    }
    if (this.user.id) {
      this.save.emit({ ...this.user, ...this.userForm.value });
    } else {
      this.create.emit({ ...this.user, ...this.userForm.value });
    }
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
