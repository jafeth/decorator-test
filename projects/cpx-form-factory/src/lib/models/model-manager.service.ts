import { Inject, Injectable, Type } from '@angular/core';

import { MANAGED_MODELS }  from '../decorators/manage-model-as.decorator';
import { ValidatorConfig } from '../validators/validator-config';
import { ModelBase }       from './model-base';
import { ModelCategory }   from './model-category.enum';
import { ModelMetadata }   from './model-metadata';
import { ModelPortal }     from './model-portal';
import { ModelType }       from './model-type';
import { PortalCategory }  from './portal-type.enum';

interface PreparedConfig {
  type: string;

  [ prop: string ]: any;
}

@Injectable( {
  providedIn: 'root'
} )
export class ModelManagerService {
  constructor( @Inject( MANAGED_MODELS ) private models: Map<string, ModelType<ModelBase>> ) { }

  has( category: ModelCategory, type: string ): boolean {
    return this.models.has( this.buildModelPath( category, type ) );
  }

  get( category: ModelCategory, type: string ): ModelType<ModelBase> {
    return this.models.get( this.buildModelPath( category, type ) );
  }

  parseConfig( category: ModelCategory, config: object ): ModelBase {
    if ( !config.hasOwnProperty( 'type' ) ) {
      throw new Error( `Type property not defined on config: ${config}` );
    }
    const type = config[ 'type' ];
    if ( !this.has( category, type ) ) {
      throw new Error( `No ${category} of type ${type} is managed!` );
    }
    const cls = this.get( category, type );

    return cls.parseConfig( this.prepareConfig( cls, config ) );
  }

  portalFor( model: ModelBase, category: PortalCategory = PortalCategory.Presentation ): Type<ModelPortal<any>> {
    if ( !model ) {
      return null;
    }
    const metadata = ModelMetadata.fromInstance( model );
    if ( !this.has( metadata.category, metadata.type ) ) {
      throw new Error( `Model is not managed` );
    }
    if ( !metadata.portals.has( category ) ) {
      throw new Error( `No ${category} portal associated to ${metadata.category} of type ${metadata.type}` );
    }
    return metadata.portals.get( category );
  }

  private prepareConfig( constructor: ModelType<ModelBase>, config: object ): PreparedConfig {
    const metadata = ModelMetadata.fromConstructor( constructor );
    const prepared = this.createPreparedConfig( metadata );
    for ( const prop in config ) {
      if ( !config.hasOwnProperty( prop ) ) {
        continue;
      }
      if ( metadata.modelCollections.has( prop ) ) {
        prepared[ prop ] = this.buildModelCollection( metadata.modelCollections.get( prop ), config[ prop ] );
        continue;
      }
      if ( metadata.validatorCollections.has( prop ) ) {
        prepared[ prop ] = this.buildValidatorCollection( config[ prop ] );
      }

      prepared[ prop ] = config[ prop ];
    }

    return prepared;
  }

  private buildModelCollection( category: ModelCategory, modelConfigurations: object[] ): ModelBase[] {
    if ( !Array.isArray( modelConfigurations ) ) {
      return [];
    }
    return modelConfigurations.map( config => this.parseConfig( category, config ) );
  }

  private buildValidatorCollection( validatorConfigurations: object[] ): ValidatorConfig[] {
    if ( !Array.isArray( validatorConfigurations ) ) {
      return [];
    }
    return validatorConfigurations
      .filter( config => config.hasOwnProperty( 'validator' ) )
      .map( config => {
        return {
          validator : config[ 'validator' ],
          parameters: config.hasOwnProperty( 'parameters' ) ? config[ 'parameters' ] : {}
        };
      } );
  }

  private createPreparedConfig( metadata: ModelMetadata ): PreparedConfig {
    const prepared = { type: metadata.type };
    metadata.modelCollections.forEach( prop => prepared[ prop ] = [] );
    metadata.validatorCollections.forEach( prop => prepared[ prop ] = [] );
    return prepared;
  }

  private buildModelPath( category: ModelCategory, type: string ): string {
    return [ category, type ].join( '.' );
  }

}
