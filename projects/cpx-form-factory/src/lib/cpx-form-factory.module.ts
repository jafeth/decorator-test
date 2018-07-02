import { CommonModule }              from '@angular/common';
import { NgModule }                  from '@angular/core';
import { ReactiveFormsModule }       from '@angular/forms';
import { ValidatorContainers }       from './decorators/manage-validator.decorator';
import { HostDirective }             from './host/host.directive';
import { CollectionOutletComponent } from './outlets/collection-outlet/collection-outlet.component';
import { ItemOutletComponent }       from './outlets/item-outlet/item-outlet.component';
import { TemplateOutletComponent }   from './outlets/template-outlet/template-outlet.component';
import { DefaultValidators }         from './validators/default-validators';
import { FormComponent } from './form/form.component';

@NgModule( {
  imports     : [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ItemOutletComponent,
    HostDirective,
    TemplateOutletComponent,
    CollectionOutletComponent,
    FormComponent
  ],
  exports     : [
    ItemOutletComponent,
    CollectionOutletComponent,
    ReactiveFormsModule
  ],
  providers   : [ { provide: ValidatorContainers, useValue: DefaultValidators, multi: true } ]
} )
export class CpxFormFactoryModule {
}
