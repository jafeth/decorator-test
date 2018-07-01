import { Component, Input, Type, ViewChild } from '@angular/core';
import { AbstractControl }                   from '@angular/forms';

import { HostDirective }       from '../../host/host.directive';
import { ModelManagerService } from '../../models/model-manager.service';
import { ModelOutlet }         from '../../models/model-outlet';
import { PortalCategory }      from '../../models/portal-type.enum';
import { ItemModel }           from '../item.model';
import { ItemPortal }          from '../item.portal';

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
