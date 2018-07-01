import { PortalModule }            from '@angular/cdk/portal';
import { CommonModule }            from '@angular/common';
import { Inject, NgModule, Type }  from '@angular/core';
import { ReactiveFormsModule }     from '@angular/forms';
import { ValidatorContainers }     from './decorators/manage-validator.decorator';
import { HostDirective }           from './host/host.directive';
import { ItemOutletComponent }     from './items/item-outlet/item-outlet.component';
import { TemplateOutletComponent } from './templates/template-outlet/template-outlet.component';
import { DefaultValidators }       from './validators/default-validators';

@NgModule( {
  imports     : [
    CommonModule,
    ReactiveFormsModule,
    PortalModule
  ],
  declarations: [ ItemOutletComponent, HostDirective, TemplateOutletComponent ],
  exports     : [ ItemOutletComponent ],
  providers   : [ { provide: ValidatorContainers, useValue: DefaultValidators, multi: true } ]
} )
export class CpxFormFactoryModule {
  constructor( @Inject( ValidatorContainers ) private containers: Type<any>[] ) {
    console.log( containers );
  }
}
