import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ValidatorContainers }       from './decorators/manage-validator.decorator';
import { FormActionDirective }       from './form/form-action.directive';
import { FormComponent }             from './form/form.component';
import { HostDirective }             from './host/host.directive';
import { CollectionOutletComponent } from './outlets/collection-outlet/collection-outlet.component';
import { ModelOutletComponent }      from './outlets/model-outlet/model-outlet.component';
import { TemplateOutletComponent }   from './outlets/template-outlet/template-outlet.component';
import { DefaultValidators }         from './validators/default-validators';

@NgModule( {
  imports     : [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ModelOutletComponent,
    HostDirective,
    TemplateOutletComponent,
    CollectionOutletComponent,
    FormComponent,
    FormActionDirective
  ],
  exports     : [
    ModelOutletComponent,
    CollectionOutletComponent,
    FormComponent,
    FormActionDirective,
    ReactiveFormsModule
  ],
  providers   : [ { provide: ValidatorContainers, useValue: DefaultValidators, multi: true } ]
} )
export class CpxFormFactoryModule {
}
