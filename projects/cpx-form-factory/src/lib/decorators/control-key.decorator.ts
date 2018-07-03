import { ModelMetadata } from '../models/model-metadata';

export function ControlKey(): PropertyDecorator {
  return function ( proto: object, propertyKey: string ) {
    const metadata = ModelMetadata.fromClass( proto );
    metadata.controlKey = propertyKey;
  };
}
