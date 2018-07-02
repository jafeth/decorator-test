import { Type }        from '@angular/core';
import { ControlType } from '../controls/control-type.enum';

import { ModelBase }      from './model-base';
import { ModelCategory }  from './model-category.enum';
import { ModelPortal }    from '../portals/model-portal';
import { PortalCategory } from '../portals/portal-type.enum';

const $$modelMetadata = Symbol( 'model metadata' );

export class ModelMetadata {
  portals = new Map<PortalCategory, Type<ModelPortal<ModelBase>>>();
  validatorCollection: { property: string } = { property: null };
  modelCollection: { property: string, category: ModelCategory } = { property: null, category: null };
  type: string;
  category: ModelCategory;
  formKey: string;
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
