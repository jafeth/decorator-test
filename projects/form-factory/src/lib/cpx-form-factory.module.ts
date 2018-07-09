import { CommonModule }                   from '@angular/common';
import { InjectionToken, NgModule, Type } from '@angular/core';
import { ReactiveFormsModule }            from '@angular/forms';

import { TriggerWhenClickedDirective }   from './actions/trigger-when-clicked.directive';
import { TriggerWhenKeyIsDownDirective } from './actions/trigger-when-key-is-down.directive';
import { FormComponent }                 from './form/form.component';
import { HostDirective }                 from './host/host.directive';
import { CollectionOutletComponent }     from './outlets/collection-outlet/collection-outlet.component';
import { FormOutletComponent }           from './outlets/form-outlet/form-outlet.component';
import { ModelOutletComponent }          from './outlets/model-outlet/model-outlet.component';
import { DefaultValidators }             from './validators/default-validators';

// To make sure the validators are loaded and managed the class containing the validator factories
// needs to be added as a provider under this token.
// For example: providers: [{ provide: ValidatorContainers, useValue: ClassWithValidators, multi: true }]
export const ValidatorContainers = new InjectionToken<Type<any>[]>( 'Array of classes with static validator factory methods' );

@NgModule( {
  imports     : [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModelOutletComponent,
    HostDirective,
    FormOutletComponent,
    CollectionOutletComponent,
    FormComponent,
    TriggerWhenClickedDirective,
    TriggerWhenKeyIsDownDirective
  ],
  exports     : [
    ModelOutletComponent,
    CollectionOutletComponent,
    FormComponent,
    TriggerWhenClickedDirective,
    TriggerWhenKeyIsDownDirective,
    ReactiveFormsModule
  ],
  providers   : [ { provide: ValidatorContainers, useValue: DefaultValidators, multi: true } ]
} )
export class CpxFormFactoryModule {
}
