import { InjectionToken, Type } from '@angular/core';
import { ValidatorFactory }     from '../validators/validator-factory';

const managedValidators = new Map<string, ValidatorFactory>();

export function ManageValidator( validator: string ) {
  return ( target: any, propertyKey: string, descriptor: PropertyDescriptor ) => {
    if ( !/^[\w]+$/.test( validator ) ) {
      throw new TypeError( `Validator name is invalid` );
    }
    if ( managedValidators.has( validator ) ) {
      throw new TypeError( `Validator ${validator} is already managed!` );
    }
    managedValidators.set( validator, target[ propertyKey ] );
  };
}

export const MANAGED_VALIDATORS = new InjectionToken( 'Map of validator factories managed through the validator manager', {
  providedIn: 'root',
  factory   : () => managedValidators
} );

// To make sure the validators are loaded and managed the class containing the validator factories
// needs to be added as a provider under this token.
// For example: providers: [{ provide: ValidatorContainers, useValue: ClassWithValidators, multi: true }]
export const ValidatorContainers = new InjectionToken<Type<any>[]>( 'Array of classes with static validator factory methods' );
