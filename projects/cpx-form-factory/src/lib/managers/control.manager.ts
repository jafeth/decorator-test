import { Injectable }                                                      from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

import { AbstractModel }    from '../models/abstract-model';
import { ModelMetadata }    from '../models/model-metadata';
import { ControlType }      from '../control-type.enum';
import { ValidatorManager } from './validator.manager';

@Injectable( {
  providedIn: 'root'
} )
export class ControlManager {

  constructor( private validatorManager: ValidatorManager ) { }

  buildControl( model: AbstractModel ): AbstractControl {
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

  private buildGroup( models: AbstractModel[] ): FormGroup {
    const controls: { [ formKey: string ]: AbstractControl } = {};
    models.forEach( model => {
      const control = this.buildControl( model );
      if ( !control ) {
        return;
      }
      const { controlKey } = ModelMetadata.fromInstance( model );
      if ( !model[ controlKey ] ) {
        return;
      }
      controls[ model[ controlKey ] ] = control;
    } );
    return new FormGroup( controls, { updateOn: 'blur' } );
  }

  private buildArray( models: AbstractModel[] ): FormArray {
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

  private buildValidators( model: AbstractModel ): ValidatorFn[] {
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
