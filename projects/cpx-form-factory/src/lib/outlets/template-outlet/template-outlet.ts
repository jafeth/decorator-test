import { EventEmitter }  from '@angular/core';
import { Observable }    from 'rxjs';
import { FormEvent }     from '../../form/form-event';
import { TemplateModel } from '../../models/template-model';
import { ModelOutlet }   from '../model-outlet/model-outlet';

export abstract class TemplateOutlet extends ModelOutlet<TemplateModel> {
  public onAction: EventEmitter<FormEvent>;
  public trigger$: Observable<FormEvent>;
}
