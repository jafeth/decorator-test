import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl }                             from '@angular/forms';
import { ItemPortal, PresentationPortalFor }           from 'cpx-form-factory';

import { Bla } from '../bla';

@Component( {
  selector   : 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls  : [ './bla.component.css' ]
} )
@PresentationPortalFor( Bla )
export class BlaComponent extends ItemPortal<Bla> implements OnInit, OnChanges {
  model: Bla;
  form: AbstractControl;

  public ngOnInit() {
  }

  public ngOnChanges( changes: SimpleChanges ): void {
    console.log( this );
  }
}
