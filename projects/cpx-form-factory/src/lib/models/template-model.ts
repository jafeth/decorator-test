import { AbstractModel } from './abstract-model';

export abstract class TemplateModel extends AbstractModel {
  uid: number;
  title: string;
  description: string;
}
