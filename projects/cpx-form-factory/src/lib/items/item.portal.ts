import { ModelPortal } from '../models/model-portal';
import { ItemModel }   from './item.model';

export abstract class ItemPortal<T extends ItemModel> extends ModelPortal<T> {
}
