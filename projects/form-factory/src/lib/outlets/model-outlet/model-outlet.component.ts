import { Component, Input, Type, ViewChild } from '@angular/core';
import { AbstractControl }                   from '@angular/forms';

import { HostDirective } from '../../host/host.directive';
import { PortalManager } from '../../managers/portal.manager';
import { AbstractModel } from '../../models/abstract-model';
import { DisplayType }   from '../../portals/display-type.enum';
import { ModelPortal }   from '../../portals/model-portal';
import { ModelOutlet }   from './model-outlet';

@Component( {
  selector   : 'cpx-model-outlet',
  templateUrl: './model-outlet.component.html',
  styleUrls  : [ './model-outlet.component.css' ]
} )
export class ModelOutletComponent extends ModelOutlet<AbstractModel> {
  @Input() model: AbstractModel;
  @Input() form: AbstractControl;
  @Input() displayType: DisplayType = DisplayType.Presentation;

  @ViewChild( HostDirective ) host: HostDirective<ModelPortal<any>>;

  get componentType(): Type<ModelPortal<any>> {
    return this.portalManager.componentFor( this.model, this.displayType );
  }

  constructor( private portalManager: PortalManager ) {
    super();
  }
}
