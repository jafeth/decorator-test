import { Type } from '@angular/core';

import { ModelBase }      from '../models/model-base';
import { ModelMetadata }  from '../models/model-metadata';
import { ModelPortal }    from '../portals/model-portal';
import { ModelType }      from '../models/model-type';
import { PortalCategory } from '../portals/portal-type.enum';

export function PresentationPortalFor( model: ModelType<ModelBase> ): ( cls: any ) => void {
  return <T extends Type<ModelPortal<ModelBase>>>( cls: T ) => {
    const metadata = ModelMetadata.fromConstructor( model );
    const portals = metadata.portals;
    if ( portals.has( PortalCategory.Presentation ) ) {
      throw new Error( `Portal for ${metadata.category} ${metadata.type} already set to: ${portals.get( PortalCategory.Presentation )}` );
    }
    portals.set( PortalCategory.Presentation, cls );
  };
}
