import { FormModel }   from '../models/form-model';
import { ModelPortal } from './model-portal';

export abstract class FormPortal<T extends FormModel> extends ModelPortal<T> {
}
