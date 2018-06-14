import { Inject, Injectable } from '@angular/core';
import { MANAGED_ITEMS } from './decorators/manage-item-as.decorator';
import { ItemType } from './items/item-type';
import { ItemModel } from './items/item.model';


@Injectable( {
  providedIn: 'root'
} )
export class ItemManagerService {

  constructor( @Inject( MANAGED_ITEMS ) private items: Map<string, ItemType<any>> ) { }

  has( type: string ): boolean {
    return this.items.has( type );
  }

  fromConfig( config: object ): ItemModel {
    if ( !config.hasOwnProperty( 'type' ) ) {
      throw new Error( `Type property not defined on object: ${config}` );
    }
    const type: string = config[ 'type' ];
    if ( !this.has( type ) ) {
      throw new Error( `No item of type ${type} defined!` );
    }
    return this.items.get( type )
               .fromConfig( config );
  }
}
