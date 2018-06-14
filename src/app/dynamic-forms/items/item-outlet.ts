import { AbstractControl } from '@angular/forms';
import { ItemModel } from './item.model';

export interface ItemOutlet {
  item: ItemModel;
  form: AbstractControl;
}
