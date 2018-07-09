import { ActionService } from '../../actions/action.service';
import { FormModel }     from '../../models/form-model';
import { ModelOutlet }   from '../model-outlet/model-outlet';

export abstract class FormOutlet extends ModelOutlet<FormModel> {
  abstract actionService: ActionService;
}
