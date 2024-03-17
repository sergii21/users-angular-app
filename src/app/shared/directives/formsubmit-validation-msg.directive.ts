import { Directive, Input, HostListener } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormSubmitValidationMsg]',
  standalone: true,
})
export class FormSubmitValidationMsgDirective {
  @Input() validationControl!: FormGroup;

  @HostListener('click', ['$event'])
  handleClickEvent() {
    this.markAsTouched(this.validationControl);
  }

  private markAsTouched(formGroup: FormGroup): void {
    formGroup.markAsTouched();
    formGroup.updateValueAndValidity();
    Object.values(formGroup.controls).forEach((control: AbstractControl) => {
      control.markAsTouched();
      control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
    });
  }
}
