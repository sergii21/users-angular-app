import {
  Directive,
  Input,
  HostListener,
  ElementRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { NgControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationMsgService } from '../../features/users/services/validation-msg.service';

@Directive({
  selector: '[appFormControlValidationMsg]',
  standalone: true
})
export class FormControlValidationMsgDirective implements OnInit, OnDestroy {
  constructor(
    private elRef: ElementRef,
    private control: NgControl,
    private validationMsgService: ValidationMsgService
  ) {}

  @Input() validationMsgId!: string;
  errorSpanId: string = '';

  statusChangeSubscription!: Subscription | undefined;

  ngOnInit(): void {
    this.errorSpanId = this.validationMsgId + new Date() + '-error-msg';
    this.statusChangeSubscription = this.control?.statusChanges?.subscribe(
      (status) => {
        if (status == 'INVALID') {
          this.showError();
        } else {
          this.removeError();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.statusChangeSubscription?.unsubscribe();
  }

  @HostListener('blur', ['$event'])
  handleBlurEvent() {
    //This is needed to handle the case of clicking a required field and moving out.
    //Rest all are handled by status change subscription
    if (this.control.value == null || this.control.value == '') {
      if (this.control.errors) this.showError();
      else this.removeError();
    }
  }

  private showError() {
    this.removeError();
    const valErrors: ValidationErrors = this.control.errors as ValidationErrors;
    const firstKey = Object.keys(valErrors)[0];
    const errorMsgKey = this.validationMsgId + '-' + firstKey + '-msg';
    const errorMsg = this.validationMsgService.getValidationMsg(errorMsgKey);
    const errSpan =
      '<span class="hint hint-error" id="' +
      this.errorSpanId +
      '">' +
      errorMsg +
      '</span>';
    this.elRef.nativeElement.parentElement.insertAdjacentHTML(
      'beforeend',
      errSpan
    );
  }

  private removeError(): void {
    const errorElement = document.getElementById(this.errorSpanId);
    if (errorElement) errorElement.remove();
  }
}
