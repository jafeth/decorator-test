import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DisplayItemOutletComponent } from './items/display-item-outlet/display-item-outlet.component';

@NgModule( {
  imports        : [
    CommonModule,
    ReactiveFormsModule,
    PortalModule
  ],
  entryComponents: [],
  declarations   : [ DisplayItemOutletComponent ],
  exports        : [ DisplayItemOutletComponent ]
} )
export class DynamicFormsModule {
  constructor() {
    console.log( 'Constructed Dynamic form module' );
  }
}
