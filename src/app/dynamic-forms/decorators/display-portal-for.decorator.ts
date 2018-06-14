import { Type } from '@angular/core';
import { ItemPortal } from '../items/item-portal';
import { ItemType } from '../items/item-type';
import { ItemModel } from '../items/item.model';

export const displayPortal = Symbol( 'display portal' );

export function DisplayPortalFor( model: ItemType<ItemModel> ): any {
  return <T extends Type<ItemPortal>>( cls: T ) => {
    if ( displayPortal in model ) {
      throw new Error( `Portal for ${model} already set to: ${model[ displayPortal ]}` );
    }
    model[ displayPortal ] = cls;
  };
}
