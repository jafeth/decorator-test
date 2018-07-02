import { ModelPortal }   from './model-portal';
import { TemplateModel } from '../models/template-model';

export abstract class TemplatePortal<T extends TemplateModel> extends ModelPortal<T> {
}
