import { Component, Input, Type, ViewChild } from '@angular/core';
import { AbstractControl }                   from '@angular/forms';
import { HostDirective }                     from '../../host/host.directive';
import { ModelManagerService }               from '../../models/model-manager.service';
import { ModelOutlet }                       from '../../models/model-outlet';
import { PortalCategory }                    from '../../models/portal-type.enum';
import { TemplateModel }                     from '../template-model';
import { TemplatePortal }                    from '../template-portal';

@Component( {
  selector   : 'cpx-template-outlet',
  templateUrl: './template-outlet.component.html',
  styleUrls  : [ './template-outlet.component.css' ]
} )
export class TemplateOutletComponent extends ModelOutlet<TemplateModel> {
  @Input() model: TemplateModel;
  @Input() form: AbstractControl;
  @Input() portalCategory: PortalCategory;

  @ViewChild( HostDirective ) host: HostDirective<TemplatePortal<TemplateModel>>;

  get componentType(): Type<TemplatePortal<TemplateModel>> {
    return this.itemService.portalFor( this.model, this.portalCategory );
  }

  constructor( private itemService: ModelManagerService ) {
    super();
  }
}
