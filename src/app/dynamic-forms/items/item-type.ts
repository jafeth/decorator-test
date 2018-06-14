import { ItemModel } from './item.model';

export interface ItemType<T extends ItemModel> {
  fromConfig( config: object ): T;

  new( ...args: any[] ): T;
}
