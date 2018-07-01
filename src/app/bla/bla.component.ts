import { Component, EventEmitter, OnInit }   from '@angular/core';
import { ItemPortal, PresentationPortalFor } from 'cpx-form-factory';

import { Bla } from '../bla';

@Component( {
  selector   : 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls  : [ './bla.component.css' ]
} )
@PresentationPortalFor( Bla )
export class BlaComponent extends ItemPortal<Bla> implements OnInit {
  model: Bla;
  change = new EventEmitter<void>();

  public ngOnInit() {
  }

  // public ngOnChanges( changes: SimpleChanges ): void {
  //   console.log( changes );
  // }

  public doSomething() {
    this.change.emit();
  }
}
