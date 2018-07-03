import { Component, Input, Type, ViewChild } from '@angular/core';
import { AbstractControl }                   from '@angular/forms';
import { FormComponent }                     from '../../form/form.component';

import { HostDirective }  from '../../host/host.directive';
import { PortalManager }  from '../../managers/portal.manager';
import { TemplateModel }  from '../../models/template-model';
import { DisplayType }    from '../../portals/display-type.enum';
import { TemplatePortal } from '../../portals/template-portal';
import { TemplateOutlet } from './template-outlet';

@Component( {
  selector   : 'cpx-template-outlet',
  templateUrl: './template-outlet.component.html',
  styleUrls  : [ './template-outlet.component.css' ]
} )
export class TemplateOutletComponent extends TemplateOutlet {
  @Input() model: TemplateModel;
  @Input() form: AbstractControl;
  @Input() displayType: DisplayType = DisplayType.Presentation;

  @ViewChild( HostDirective ) host: HostDirective<TemplatePortal<TemplateModel>>;

  get componentType(): Type<TemplatePortal<TemplateModel>> {
    return this.portalManager.componentFor( this.model, this.displayType ) as Type<TemplatePortal<TemplateModel>>;
  }

  constructor( private portalManager: PortalManager, private rootForm: FormComponent ) {
    super();
    this.trigger$ = this.rootForm.trigger$;
    this.onAction = this.rootForm.action;
  }

}
