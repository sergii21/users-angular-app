import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/** A hero's name can't match the hero's alter ego */
export const repeatPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  return password?.value !== repeatPassword?.value
    ? { repeatPassword: true }
    : null;
};
