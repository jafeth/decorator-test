import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ManageValidator }                                from 'cpx-form-factory';

export class CustomValidators {

  @ManageValidator( 'custom' )
  static custom( paramaters: {} ): ValidatorFn {
    return ( c: AbstractControl ): ValidationErrors | null => {
      return null;
    };
  }
}
