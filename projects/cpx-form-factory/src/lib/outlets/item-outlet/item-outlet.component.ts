import { Component, Input, Type, ViewChild } from '@angular/core';
import { AbstractControl }                   from '@angular/forms';

import { HostDirective }       from '../../host/host.directive';
import { ModelManagerService } from '../../models/model-manager.service';
import { ModelOutlet }         from '../model-outlet';
import { PortalCategory }      from '../../portals/portal-type.enum';
import { ItemModel }           from '../../models/item.model';
import { ItemPortal }          from '../../portals/item.portal';

@Component( {
  selector   : 'cpx-item-outlet',
  templateUrl: './item-outlet.component.html',
  styleUrls  : [ './item-outlet.component.css' ]
} )
export class ItemOutletComponent extends ModelOutlet<ItemModel> {
  @Input() model: ItemModel;
  @Input() form: AbstractControl;

  @ViewChild( HostDirective ) host: HostDirective<ItemPortal<any>>;

  get componentType(): Type<ItemPortal<any>> {
    return this.modelManager.portalFor( this.model, PortalCategory.Presentation );
  }

  constructor( private modelManager: ModelManagerService ) {
    super();
  }
}
