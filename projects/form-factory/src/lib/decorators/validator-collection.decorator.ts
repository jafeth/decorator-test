import { ModelMetadata } from '../models/model-metadata';

export function ValidatorCollection(): PropertyDecorator {
  return function ( proto: object, propertyKey: string ) {
    const metadata = ModelMetadata.fromClass( proto );
    metadata.validatorCollection.property = propertyKey;
  };
}
