import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl }                             from '@angular/forms';
import { ModelPortal, PresentationFor }                from 'cpx-form-factory';

import { Bla } from '../bla';

@Component( {
  selector   : 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls  : [ './bla.component.css' ]
} )
@PresentationFor( Bla )
export class BlaComponent extends ModelPortal<Bla> implements OnInit, OnChanges {
  model: Bla;
  form: AbstractControl;

  public ngOnInit() {
  }

  public ngOnChanges( changes: SimpleChanges ): void {
    console.log( this );
  }
}
