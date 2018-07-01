import { ModelBase } from '../models/model-base';

export abstract class TemplateModel extends ModelBase {
  uid: number;
  title: string;
  description: string;
}
