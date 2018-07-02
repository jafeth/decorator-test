import { ModelPortal } from './model-portal';
import { ItemModel }   from '../models/item.model';

export abstract class ItemPortal<T extends ItemModel> extends ModelPortal<T> {
}
