import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationMsgService {
  public getValidationMsg(validationId: string): string {
    return this.errorMessages[validationId];
  }

  private errorMessages: { [key: string]: string } = {
    'username-required-msg': 'This field is a required field',
    'firstName-required-msg': 'This field is a required field',
    'lastName-required-msg': 'This field is a required field',
    'email-required-msg': 'This field is a required field',
    'email-email-msg': 'This field should be valid email address',
    'type-required-msg': 'This field is a required field',
    'password-required-msg': 'This field is a required field',
    'password-pattern-msg': 'Min length 8. at least one number and one letter',
    'repeatPassword-required-msg': 'This field is a required field',
  };
}
