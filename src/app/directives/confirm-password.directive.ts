import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordDirective,
    multi: true
    }]
})
export class ConfirmPasswordDirective implements Validator {
  @Input() appConfirmEqualValidator: string;
  constructor() { }
  validate(control: AbstractControl): {[key: string]: any} |null {
    const controlToCompare = this.appConfirmEqualValidator;
    if (controlToCompare !== control.value) {
    return { 'notEqual': true }
    }
    return null;
    }
}
