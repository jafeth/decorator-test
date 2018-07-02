import { Inject, Injectable } from '@angular/core';
import { ValidatorFn }        from '@angular/forms';
import { MANAGED_VALIDATORS } from '../decorators/manage-validator.decorator';
import { ValidatorConfig }    from '../validators/validator-config';
import { ValidatorFactory }   from '../validators/validator-factory';

@Injectable( {
  providedIn: 'root'
} )
export class ValidatorManagerService {

  constructor( @Inject( MANAGED_VALIDATORS ) private validators: Map<string, ValidatorFactory> ) { }

  has( validator: string ): boolean {
    return this.validators.has( validator );
  }

  get( validator: string ): ValidatorFactory {
    return this.validators.get( validator );
  }

  parseConfig( config: ValidatorConfig ): ValidatorFn {
    if ( !this.has( config.validator ) ) {
      throw new Error( `Validator: ${config.validator} is not managed!` );
    }
    const factory = this.get( config.validator );
    return factory( config.parameters );
  }
}
