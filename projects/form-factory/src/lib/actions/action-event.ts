import { AbstractControl } from '@angular/forms';
import { FormState }       from './form-state.enum';

export class ActionEvent {
  rootForm: AbstractControl;
  state?: FormState;
  progress?: number;
  domEvent?: Event;

  constructor( public action: string, public readonly async: boolean = false ) {
  }
}
