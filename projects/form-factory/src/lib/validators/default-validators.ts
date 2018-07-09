import { ValidatorFn, Validators } from '@angular/forms';
import { ManageValidator }         from '../decorators/manage-validator.decorator';

export class DefaultValidators {

  @ManageValidator( 'min' )
  static min( parameters: { min?: number } ): ValidatorFn {
    const { min = Number.NEGATIVE_INFINITY } = parameters;
    if ( Number.isNaN( min ) ) {
      throw new TypeError( `invalid parameters` );
    }
    return Validators.min( min );
  }

  @ManageValidator( 'max' )
  static max( parameters: { max?: number } ): ValidatorFn {
    const { max = Number.POSITIVE_INFINITY } = parameters;
    if ( Number.isNaN( max ) ) {
      throw new TypeError( `invalid parameters` );
    }
    return Validators.max( max );
  }

  @ManageValidator( 'required' )
  static required(): ValidatorFn {
    return Validators.required;
  }

  @ManageValidator( 'requiredTrue' )
  static requiredTrue(): ValidatorFn {
    return Validators.requiredTrue;
  }

  @ManageValidator( 'email' )
  static email(): ValidatorFn {
    return Validators.email;
  }

  @ManageValidator( 'minLength' )
  static minLength( parameters: { minLength?: number } ) {
    const { minLength = 0 } = parameters;
    if ( !Number.isInteger( minLength ) || minLength < 0 ) {
      throw new TypeError( `invalid parameters` );
    }
    return Validators.minLength( minLength );
  }

  @ManageValidator( 'maxLength' )
  static maxLength( parameters: { maxLength?: number } ) {
    const { maxLength = Number.MAX_SAFE_INTEGER } = parameters;
    if ( !Number.isInteger( maxLength ) || maxLength < 1 ) {
      throw new TypeError( `invalid parameters` );
    }
    return Validators.minLength( maxLength );
  }

  @ManageValidator( 'pattern' )
  static pattern( parameters: { pattern?: string | RegExp } ): ValidatorFn {
    const { pattern } = parameters;
    if ( !pattern ) {
      throw new TypeError( 'invalid parameters' );
    }
    return Validators.pattern( pattern );
  }

}
