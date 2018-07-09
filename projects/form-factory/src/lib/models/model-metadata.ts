import { Type }        from '@angular/core';
import { ControlType } from '../control-type.enum';
import { ModelPortal } from '../portals/model-portal';
import { DisplayType } from '../portals/display-type.enum';

import { AbstractModel } from './abstract-model';
import { ModelCategory } from './model-category.enum';

const $$modelMetadata = Symbol( 'model metadata' );

export class ModelMetadata {
  portals = new Map<DisplayType, Type<ModelPortal<AbstractModel>>>();
  validatorCollection: { property: string } = { property: null };
  modelCollection: { property: string, category: ModelCategory } = { property: null, category: null };
  type: string;
  category: ModelCategory;
  controlKey: string;
  controlType: ControlType = ControlType.NoControl;

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
