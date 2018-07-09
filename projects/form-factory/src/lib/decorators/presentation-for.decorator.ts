import { Type } from '@angular/core';

import { AbstractModel } from '../models/abstract-model';
import { ModelCategory } from '../models/model-category.enum';
import { ModelMetadata } from '../models/model-metadata';
import { ModelType }     from '../models/model-type';
import { DisplayType }   from '../portals/display-type.enum';
import { FormPortal }    from '../portals/form-portal';
import { ModelPortal }   from '../portals/model-portal';

export function PresentationFor( model: ModelType<AbstractModel> ): ( cls: any ) => void {
  return <T extends Type<ModelPortal<AbstractModel>>>( cls: T ) => {
    const { portals, type, category } = ModelMetadata.fromConstructor( model );
    if ( portals.has( DisplayType.Presentation ) ) {
      throw new Error( `Portal for ${category} ${type} already set.` );
    }
    if ( category === ModelCategory.Form && !( cls.prototype instanceof FormPortal ) ) {
      throw new Error( `Component needs to be extended from the FormPortal class` );
    }
    if ( cls.prototype instanceof FormPortal && category !== ModelCategory.Form ) {
      throw new Error( `Component can only have a category of Form` );
    }
    portals.set( DisplayType.Presentation, cls );
  };
}
