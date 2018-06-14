import { ItemModel } from './item.model';

export abstract class InputItemModel extends ItemModel {
  key: string;
  label: string;
  validators: string[] = [];
}
