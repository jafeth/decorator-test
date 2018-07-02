import { ModelBase } from './model-base';

export abstract class TemplateModel extends ModelBase {
  uid: number;
  title: string;
  description: string;
}
