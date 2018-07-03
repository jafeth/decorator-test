import { Inject, Injectable, Type } from '@angular/core';

import { MANAGED_MODELS }  from '../decorators/manage-model.decorator';
import { ModelPortal }     from '../portals/model-portal';
import { DisplayType }     from '../portals/display-type.enum';
import { ValidatorConfig } from '../validators/validator-config';
import { AbstractModel }   from '../models/abstract-model';
import { ModelCategory }   from '../models/model-category.enum';
import { ModelMetadata }   from '../models/model-metadata';
import { ModelType }       from '../models/model-type';

interface PreparedConfig {
  type: string;

  [ prop: string ]: any;
}

@Injectable( {
  providedIn: 'root'
} )
export class ModelManager {
  constructor( @Inject( MANAGED_MODELS ) private models: Map<string, ModelType<AbstractModel>> ) { }

  has( category: ModelCategory, type: string ): boolean {
    return this.models.has( this.buildModelPath( category, type ) );
  }

  get( category: ModelCategory, type: string ): ModelType<AbstractModel> {
    return this.models.get( this.buildModelPath( category, type ) );
  }

  parseConfig( category: ModelCategory, config: object ): AbstractModel {
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

  portalFor( model: AbstractModel, portalType: DisplayType = DisplayType.Presentation ): Type<ModelPortal<any>> {
    if ( !model ) {
      return null;
    }
    const { portals, category, type } = ModelMetadata.fromInstance( model );
    if ( !this.has( category, type ) ) {
      throw new Error( `Model is not managed` );
    }
    if ( !portals.has( portalType ) ) {
      throw new Error( `No ${category} portal associated to ${category} of type ${type}` );
    }
    return portals.get( portalType );
  }

  private prepareConfig( constructor: ModelType<AbstractModel>, config: object ): PreparedConfig {
    const metadata = ModelMetadata.fromConstructor( constructor );
    const prepared = this.createPreparedConfig( metadata );
    const { modelCollection, validatorCollection } = metadata;
    for ( const prop in config ) {
      if ( !config.hasOwnProperty( prop ) ) {
        continue;
      }
      if ( modelCollection.property === prop ) {
        prepared[ prop ] = this.buildModelCollection( modelCollection.category, config[ prop ] );
        continue;
      }
      if ( validatorCollection.property === prop ) {
        prepared[ prop ] = this.buildValidatorCollection( config[ prop ] );
      }

      prepared[ prop ] = config[ prop ];
    }

    return prepared;
  }

  private buildModelCollection( category: ModelCategory, modelConfigurations: object[] ): AbstractModel[] {
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
    const { modelCollection, validatorCollection, type } = metadata;
    const prepared = { type: type };
    if ( modelCollection.property ) {
      prepared[ modelCollection.property ] = [];
    }
    if ( validatorCollection.property ) {
      prepared[ validatorCollection.property ] = [];
    }
    return prepared;
  }

  private buildModelPath( category: ModelCategory, type: string ): string {
    return [ category, type ].join( '.' );
  }

}
