import { Component, OnInit }            from '@angular/core';
import { AbstractControl }              from '@angular/forms';
import { ModelPortal, PresentationFor } from '@carapax/form-factory';

import { Bla } from '../bla';

@Component( {
  selector   : 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls  : [ './bla.component.css' ]
} )
@PresentationFor( Bla )
export class BlaComponent extends ModelPortal<Bla> implements OnInit {
  model: Bla;
  form: AbstractControl;

  public ngOnInit() {
  }
}
