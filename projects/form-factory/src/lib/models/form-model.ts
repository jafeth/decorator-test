import { AbstractModel } from './abstract-model';

export abstract class FormModel extends AbstractModel {
  uid: number;
  title: string;
  description: string;
}
