import { Component, Input, Type, ViewChild } from '@angular/core';
import { AbstractControl }                   from '@angular/forms';
import { ActionService }                     from '../../actions/action.service';

import { HostDirective }  from '../../host/host.directive';
import { PortalManager }  from '../../managers/portal.manager';
import { FormModel }      from '../../models/form-model';
import { DisplayType }    from '../../portals/display-type.enum';
import { FormPortal }     from '../../portals/form-portal';
import { ModelPortal }    from '../../portals/model-portal';
import { PortalMetadata } from '../../portals/portal-metadata';
import { FormOutlet }     from './form-outlet';

@Component( {
  selector   : 'cpx-form-outlet',
  templateUrl: './form-outlet.component.html',
  styleUrls  : [ './form-outlet.component.css' ]
} )
export class FormOutletComponent extends FormOutlet {
  @Input() model: FormModel;
  @Input() form: AbstractControl;
  @Input() displayType: DisplayType = DisplayType.Presentation;

  @ViewChild( HostDirective ) host: HostDirective<FormPortal<FormModel>>;

  get componentType(): Type<FormPortal<FormModel>> {
    return this.portalManager.componentFor( this.model, this.displayType ) as Type<FormPortal<FormModel>>;
  }

  constructor( private portalManager: PortalManager, public actionService: ActionService ) {
    super();
  }

  public onAttach( portal: ModelPortal<FormModel> ): void {
    super.onAttach( portal );
    // Attaching the actions asynchronously to ensure the changes in the actions are discovered in the next digest
    setTimeout( () => this.attachActions( portal ) );
  }

  public onDetach( portal: ModelPortal<FormModel> ): void {
    super.onDetach( portal );
    // Detaching the actions asynchronously to ensure the changes in the actions are discovered in the next digest
    setTimeout( () => this.detachActions( portal ) );
  }

  private attachActions( portal: ModelPortal<FormModel> ) {
    const { handlers } = PortalMetadata.fromInstance( portal );
    handlers.forEach( ( method, action ) => {
      if ( !( method in portal ) || typeof( portal[ method ] ) !== 'function' ) {
        return;
      }
      this.actionService.set( action, portal[ method ].bind( portal ) );
    } );
  }

  private detachActions( portal: ModelPortal<FormModel> ) {
    if ( !portal ) {
      return;
    }
    const { handlers } = PortalMetadata.fromInstance( portal );
    handlers.forEach( ( method, action ) => {
      this.actionService.delete( action );
    } );
  }

}
