import { Injectable, Type } from '@angular/core';
import { AbstractModel }    from '../models/abstract-model';
import { ModelMetadata }    from '../models/model-metadata';
import { DisplayType }      from '../portals/display-type.enum';
import { ModelPortal }      from '../portals/model-portal';
import { ModelManager }     from './model.manager';

@Injectable( {
  providedIn: 'root'
} )
export class PortalManager {

  constructor( private modelManager: ModelManager ) { }

  componentFor( model: AbstractModel, displayType: DisplayType = DisplayType.Presentation ): Type<ModelPortal<any>> {
    if ( !model ) {
      return null;
    }
    const { portals, category, type } = ModelMetadata.fromInstance( model );
    if ( !this.modelManager.has( category, type ) ) {
      throw new Error( `Model is not managed` );
    }
    if ( !portals.has( displayType ) ) {
      throw new Error( `No ${category} portal associated to ${category} of type ${type}` );
    }
    return portals.get( displayType );
  }
}
