import { ModelType }     from '../models/model-type';
import { TemplateModel } from './template-model';

export interface TemplateType<T extends TemplateModel> extends ModelType<T> {
}
