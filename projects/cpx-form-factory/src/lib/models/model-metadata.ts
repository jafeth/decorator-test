import { Type } from '@angular/core';

import { ModelBase }      from './model-base';
import { ModelCategory }  from './model-category.enum';
import { ModelPortal }    from './model-portal';
import { PortalCategory } from './portal-type.enum';

const $$modelMetadata = Symbol( 'model metadata' );

export class ModelMetadata {
  portals = new Map<PortalCategory, Type<ModelPortal<ModelBase>>>();
  validatorCollections = new Set<string>();
  modelCollections = new Map<string, ModelCategory>();
  type: string;
  category: ModelCategory;

  static fromClass( cls: object ): ModelMetadata {
    return ModelMetadata.fromConstructor( cls.constructor );
  }

  static fromConstructor( constructor: Function ): ModelMetadata {
    if ( !constructor.hasOwnProperty( $$modelMetadata ) ) {
      Reflect.defineProperty( constructor, $$modelMetadata, { value: new ModelMetadata() } );
    }
    return constructor[ $$modelMetadata ];
  }

  static fromInstance( instance: object ): ModelMetadata {
    return ModelMetadata.fromClass( Object.getPrototypeOf( instance ) );
  }
}
