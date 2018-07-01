import { InputItemModel } from '../items/input-item.model';
import { ModelMetadata }  from '../models/model-metadata';

export function ValidatorCollection(): PropertyDecorator {
  return function ( proto: object, propertyKey: string ) {
    console.log( proto );
    const metadata = ModelMetadata.fromClass( proto );
    metadata.validatorCollections.add( propertyKey );
  };
}
