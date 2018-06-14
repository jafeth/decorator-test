import { InjectionToken } from '@angular/core';
import { ItemType } from '../items/item-type';
import { ItemModel } from '../items/item.model';

const managed_items = new Map<string, ItemType<any>>();

export function ManageItemAs<T extends ItemModel>( type: string ): ( cls: ItemType<T> ) => ItemType<T> {

  return <TFunction extends ItemType<ItemModel>>( cls: TFunction ) => {
    if ( managed_items.has( type ) ) {
      throw new Error( `Item of type: ${type} already declared!` );
    }

    // Using an IIF to prevent setting the name property of the newly returned class.
    const itemCls: TFunction = function () {
      return class extends cls {
        constructor( ...args: any[] ) {
          super( args );
          this.type = type;
        }
      };
    }();

    managed_items.set( type, itemCls );
    return itemCls;
  };
}

export const MANAGED_ITEMS = new InjectionToken( 'Map of items managed through the item manager', {
  providedIn: 'root',
  factory   : () => managed_items
} );

