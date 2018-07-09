import { InjectionToken } from '@angular/core';
import { ControlType }    from '../control-type.enum';
import { AbstractModel }  from '../models/abstract-model';
import { ModelCategory }  from '../models/model-category.enum';
import { ModelMetadata }  from '../models/model-metadata';
import { ModelType }      from '../models/model-type';

const managedModels = new Map<string, ModelType<any>>();

export interface ManagedModelOptions {
  category: ModelCategory;
  controlType?: ControlType;
}

export function ManageModel<T extends AbstractModel>( options: ManagedModelOptions ): ( cls: ModelType<T> ) => void {
  const { category, controlType = ControlType.NoControl } = options;
  return <TFunction extends ModelType<AbstractModel>>( cls: TFunction ) => {
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
    metadata.controlType = controlType;

    managedModels.set( modelPath, cls );
  };
}

export const MANAGED_MODELS = new InjectionToken( 'Map of models managed through the item manager', {
  providedIn: 'root',
  factory   : () => managedModels
} );
