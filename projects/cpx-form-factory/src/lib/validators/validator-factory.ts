import { ValidatorFn } from '@angular/forms';

export type ValidatorFactory = ( parameters?: { [ param: string ]: any } ) => ValidatorFn;
