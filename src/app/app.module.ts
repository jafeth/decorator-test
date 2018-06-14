import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BlaComponent } from './bla/bla.component';
import { DynamicFormsModule } from './dynamic-forms/dynamic-forms.module';
import { ItemManagerService } from './dynamic-forms/item-manager.service';

@NgModule( {
  declarations   : [
    AppComponent,
    BlaComponent
  ],
  imports        : [
    BrowserModule,
    DynamicFormsModule,
    BrowserAnimationsModule
  ],
  providers      : [],
  entryComponents: [ BlaComponent ],
  bootstrap      : [ AppComponent ]
} )
export class AppModule {
  constructor( private itemManager: ItemManagerService ) {
    // console.log( 'Constructed App Module' );
    // const config = {
    //   type : 'woei',
    //   key  : 'bla',
    //   order: 1
    // };
    //
    // console.log( itemManager.fromConfig( config ) );
    // console.log( Bla );
    // const instance = new Bla();
    // console.log( instance );
    // const prototype = Object.getPrototypeOf( instance );
    // console.log( formPortal in prototype.constructor );
    // console.log( Bla );
  }
}
