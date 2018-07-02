import { NgModule }                                  from '@angular/core';
import { BrowserModule }                             from '@angular/platform-browser';
import { BrowserAnimationsModule }                   from '@angular/platform-browser/animations';
import { CpxFormFactoryModule, ValidatorContainers } from 'cpx-form-factory';

import { AppComponent }          from './app.component';
import { BlaComponent }          from './bla/bla.component';
import { CustomValidators }      from './custom-validators';
import { WoeiTemplateComponent } from './woei-template/woei-template.component';

@NgModule( {
  declarations   : [
    AppComponent,
    BlaComponent,
    WoeiTemplateComponent
  ],
  imports        : [
    BrowserModule,
    BrowserAnimationsModule,
    CpxFormFactoryModule
  ],
  providers      : [ { provide: ValidatorContainers, useValue: CustomValidators, multi: true } ],
  entryComponents: [ BlaComponent, WoeiTemplateComponent ],
  bootstrap      : [ AppComponent ]
} )
export class AppModule {
}
