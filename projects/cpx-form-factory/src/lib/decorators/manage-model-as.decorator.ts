import { InjectionToken } from '@angular/core';
import { ModelBase }      from '../models/model-base';
import { ModelCategory }  from '../models/model-category.enum';
import { ModelMetadata }  from '../models/model-metadata';
import { ModelType }      from '../models/model-type';

const managedModels = new Map<string, ModelType<any>>();

export function ManageModelAs<T extends ModelBase>( category: ModelCategory ): ( cls: ModelType<T> ) => void {

  return <TFunction extends ModelType<ModelBase>>( cls: TFunction ) => {
    const instance = new cls();
    if ( !instance.type ) {
      throw new Error( `Type not set on model` );
    }
    if ( !/^[\w]+$/.test( instance.type ) ) {
      throw new Error( `Type name is invalid` );
    }

    const modelPath = [ category, instance.type ].join( '.' );
    if ( managedModels.has( modelPath ) ) {
      throw new Error( `${category} of : '${instance.type}' already declared!` );
    }
    const metadata = ModelMetadata.fromConstructor( cls );
    metadata.type = instance.type;
    metadata.category = category;

    managedModels.set( modelPath, cls );
  };
}

export const MANAGED_MODELS = new InjectionToken( 'Map of models managed through the item manager', {
  providedIn: 'root',
  factory   : () => managedModels
} );
