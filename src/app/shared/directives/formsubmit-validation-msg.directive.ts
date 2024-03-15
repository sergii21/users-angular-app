import { Directive, Input, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
      if (control.controls) {
        this.markAsTouched(control);
      }
    });
  }
}
