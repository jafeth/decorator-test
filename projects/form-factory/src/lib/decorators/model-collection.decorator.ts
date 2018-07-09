import { ModelCategory } from '../models/model-category.enum';
import { ModelMetadata } from '../models/model-metadata';

export function ModelCollection( category: ModelCategory ): PropertyDecorator {
  return function ( cls: object, propertyKey: string ) {
    const metadata = ModelMetadata.fromClass( cls );
    metadata.modelCollection = { property: propertyKey, category: category };
  };
}
