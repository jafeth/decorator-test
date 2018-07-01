import { ModelType } from '../models/model-type';
import { ItemModel } from './item.model';

export interface ItemType<T extends ItemModel> extends ModelType<T> {
}
