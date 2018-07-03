import { AbstractControl } from '@angular/forms';
import { FormState }       from './form-state.enum';

export class FormEvent {
  action: string;
  rootForm: AbstractControl;
  state: FormState;
  progress: number;
}
