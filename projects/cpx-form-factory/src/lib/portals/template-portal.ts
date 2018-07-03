import { EventEmitter }                 from '@angular/core';
import { FormEvent }                    from '../form/form-event';
import { TemplateModel }                from '../models/template-model';
import { ModelOutlet }                  from '../outlets/model-outlet/model-outlet';
import { TemplateOutlet }               from '../outlets/template-outlet/template-outlet';
import { $$subscriptions, ModelPortal } from './model-portal';
import { PortalMetadata }               from './portal-metadata';

export abstract class TemplatePortal<T extends TemplateModel> extends ModelPortal<T> {
  public onAction: EventEmitter<FormEvent>;

  public attachTo( outlet: ModelOutlet<any> ): void {
    super.attachTo( outlet );
    const templateOutlet = outlet as TemplateOutlet;
    this.onAction = templateOutlet.onAction;
    this[ $$subscriptions ].push( templateOutlet.trigger$.subscribe( event => this.handleAction( event ) ) );
  }

  private handleAction( event: FormEvent ): void {
    const { handlers } = PortalMetadata.fromInstance( this );
    if ( handlers.has( event.action ) ) {
      this[ handlers.get( event.action ) ]( event );
    }
  }
}
