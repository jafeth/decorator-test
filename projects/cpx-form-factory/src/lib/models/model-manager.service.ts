import { Inject, Injectable, Type } from '@angular/core';

import { MANAGED_MODELS }  from '../decorators/manage-model-as.decorator';
import { ModelPortal }     from '../portals/model-portal';
import { PortalCategory }  from '../portals/portal-type.enum';
import { ValidatorConfig } from '../validators/validator-config';
import { ModelBase }       from './model-base';
import { ModelCategory }   from './model-category.enum';
import { ModelMetadata }   from './model-metadata';
import { ModelType }       from './model-type';

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
      if ( metadata.modelCollection.property === prop ) {
        prepared[ prop ] = this.buildModelCollection( metadata.modelCollection.category, config[ prop ] );
        continue;
      }
      if ( metadata.validatorCollection.property === prop ) {
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
    return modelConfigurations
      .map( ( config, index ) => ( {
        order: config.hasOwnProperty( 'order' ) ? config[ 'order' ] : index,
        model: this.parseConfig( category, config )
      } ) )
      .sort( ( a, b ) => a.order - b.order )
      .map( item => item.model );
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
    if ( metadata.modelCollection.property ) {
      prepared[ metadata.modelCollection.property ] = [];
    }
    if ( metadata.validatorCollection.property ) {
      prepared[ metadata.validatorCollection.property ] = [];
    }
    return prepared;
  }

  private buildModelPath( category: ModelCategory, type: string ): string {
    return [ category, type ].join( '.' );
  }

}
