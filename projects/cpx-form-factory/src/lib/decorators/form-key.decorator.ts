import { ControlType }   from '../controls/control-type.enum';
import { ModelMetadata } from '../models/model-metadata';

export function FormKey( controlType: ControlType ): PropertyDecorator {
  return function ( proto: object, propertyKey: string ) {
    const metadata = ModelMetadata.fromClass( proto );
    metadata.formKey = propertyKey;
    metadata.controlType = controlType;
  };
}
