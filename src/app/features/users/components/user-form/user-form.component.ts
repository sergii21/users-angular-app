import { UniqueUserNameValidator } from './../../validators/unique-user.validator';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { User, newUser } from '../../models/user';
import {
  AbstractControl,
  NonNullableFormBuilder,
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
  @Input() user: User = newUser;

  @Output() create = new EventEmitter<User>();
  @Output() save = new EventEmitter<User>();
  @Output() delete = new EventEmitter<User>();

  userForm = this.fb.group(
    {
      id: this.user.id,
      username: [
        '',
        Validators.required,
        this.uniqueUserNameValidator.validate.bind(
          this.uniqueUserNameValidator
        ),
      ],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      password: [
        this.user.password,
        [Validators.required, Validators.pattern(StrongPasswordRegx)],
      ],
      repeatPassword: [this.user.repeatPassword, [Validators.required]],
      type: [this.user.type, [Validators.required]],
    },
    { validators: repeatPasswordValidator }
  );
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
    private fb: NonNullableFormBuilder,
    private uniqueUserNameValidator: UniqueUserNameValidator
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.setMode();
      this.patchForm();
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

  onSubmit() {
    console.log(this.userForm, this.user);

    if (!this.userForm.valid) {
      return;
    }
    if (this.user.id) {
      this.save.emit(this.userForm.getRawValue());
    } else {
      this.create.emit(this.userForm.getRawValue());
    }
  }

  onDelete(user: User) {
    this.delete.emit(user);
  }
}
