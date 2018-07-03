import { Type } from '@angular/core';

import { AbstractModel } from '../models/abstract-model';
import { ModelMetadata } from '../models/model-metadata';
import { ModelType }     from '../models/model-type';
import { ModelPortal }   from '../portals/model-portal';
import { DisplayType }   from '../portals/display-type.enum';

export function AdministrationFor( model: ModelType<AbstractModel> ): ( cls: any ) => void {
  return <T extends Type<ModelPortal<AbstractModel>>>( cls: T ) => {
    const { portals, type, category } = ModelMetadata.fromConstructor( model );
    if ( portals.has( DisplayType.Administration ) ) {
      throw new Error( `Administration Portal for ${category} ${type} already set.` );
    }
    portals.set( DisplayType.Administration, cls );
  };
}
