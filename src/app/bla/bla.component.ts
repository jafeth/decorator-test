import { Component, OnInit } from '@angular/core';
import { Bla } from '../bla';
import { DisplayItemOutletComponent } from '../dynamic-forms/items/display-item-outlet/display-item-outlet.component';
import { DisplayPortalFor } from '../dynamic-forms/decorators/display-portal-for.decorator';
import { ItemPortal } from '../dynamic-forms/items/item-portal';

@Component( {
  selector   : 'app-bla',
  templateUrl: './bla.component.html',
  styleUrls  : [ './bla.component.css' ]
} )
@DisplayPortalFor( Bla )
export class BlaComponent implements OnInit, ItemPortal {
  item: Bla;

  constructor() { }

  ngOnInit() {
  }

  public attachTo( outlet: DisplayItemOutletComponent ): void {
    this.item = outlet.item as Bla;
  }

  public detachFrom( outlet: DisplayItemOutletComponent ): void {
  }

}
