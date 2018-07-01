import { ModelPortal }   from '../models/model-portal';
import { TemplateModel } from './template-model';

export abstract class TemplatePortal<T extends TemplateModel> extends ModelPortal<T> {
}
