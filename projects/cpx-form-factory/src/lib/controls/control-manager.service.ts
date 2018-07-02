import { Injectable }                                                      from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { ModelBase }               from '../models/model-base';
import { ModelMetadata }           from '../models/model-metadata';
import { ControlType }             from './control-type.enum';
import { ValidatorManagerService } from './validator-manager.service';

@Injectable( {
  providedIn: 'root'
} )
export class ControlManagerService {

  constructor( private validatorManager: ValidatorManagerService ) { }

  buildControl( model: ModelBase ): AbstractControl {
    let control: AbstractControl;
    const { modelCollection, controlType } = ModelMetadata.fromInstance( model );
    switch ( controlType ) {
      case ControlType.Input:
        control = new FormControl( null );
        break;
      case ControlType.Group:
        control = this.buildGroup( model[ modelCollection.property ] || [] );
        break;
      case ControlType.Array:
        control = this.buildArray( model[ modelCollection.property ] || [] );
        break;
      case ControlType.NoControl:
      default:
        return;
    }
    control.setValidators( this.buildValidators( model ) );
    return control;
  }

  private buildGroup( models: ModelBase[] ): FormGroup {
    const controls: { [ formKey: string ]: AbstractControl } = {};
    models.forEach( model => {
      const control = this.buildControl( model );
      if ( !control ) {
        return;
      }
      const { formKey } = ModelMetadata.fromInstance( model );
      if ( !model[ formKey ] ) {
        return;
      }
      controls[ model[ formKey ] ] = control;
    } );
    return new FormGroup( controls, { updateOn: 'blur' } );
  }

  private buildArray( models: ModelBase[] ): FormArray {
    const controls: AbstractControl[] = [];
    models.forEach( model => {
      const control = this.buildControl( model );
      if ( !control ) {
        return;
      }
      controls.push( control );
    } );
    return new FormArray( controls );
  }

  private buildValidators( model: ModelBase ): ValidatorFn[] {
    const { property } = ModelMetadata.fromInstance( model ).validatorCollection;
    if ( !property ) {
      return [];
    }
    if ( !model[ property ] || !Array.isArray( model[ property ] ) ) {
      return [];
    }
    return model[ property ].map( validator => this.validatorManager.parseConfig( validator ) );

  }
}
