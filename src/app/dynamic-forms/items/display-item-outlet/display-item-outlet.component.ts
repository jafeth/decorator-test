import { CdkPortalOutlet, ComponentPortal } from '@angular/cdk/portal';
import { Component, ComponentRef, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemPortal } from '../item-portal';
import { ItemModel } from '../item.model';
import { displayPortal } from '../../decorators/display-portal-for.decorator';
import { ItemOutlet } from '../item-outlet';

@Component( {
  selector   : 'cpx-display-item-outlet',
  templateUrl: './display-item-outlet.component.html',
  styleUrls  : [ './display-item-outlet.component.css' ]
} )
export class DisplayItemOutletComponent implements OnInit, OnDestroy, ItemOutlet {
  @Input() item: ItemModel;
  @Input() form: FormGroup;

  @ViewChild( CdkPortalOutlet ) private outlet: CdkPortalOutlet;

  private ref: ComponentRef<ItemPortal>;

  private get instance(): ItemPortal {
    if ( !this.ref ) {
      return null;
    }
    return this.ref.instance;
  }

  constructor() { }

  ngOnInit() {
    this.attach();
  }

  public ngOnDestroy(): void {
    this.detach();
  }

  private attach(): void {
    if ( !this.item ) {
      return;
    }
    const portal = new ComponentPortal<ItemPortal>( this.getPortalFromItem() );
    this.ref = this.outlet.attach( portal );
    this.instance.attachTo( this );
  }

  private getPortalFromItem(): Type<ItemPortal> {
    const itemPrototype = Object.getPrototypeOf( this.item );
    if ( !( displayPortal in itemPrototype.constructor ) ) {
      throw new Error( 'item has no portal defined' );
    }
    return itemPrototype.constructor[ displayPortal ];
  }

  private detach(): void {
    if ( !this.instance.detachFrom ) {
      return;
    }
    this.instance.detachFrom( this );
  }

}
