import { Directive, HostListener, Input } from '@angular/core';
import { FormComponent }                  from './form.component';

@Directive( {
  selector: 'button[cpxFormAction]'
} )
export class FormActionDirective {
  @Input() cpxFormAction: string;

  @HostListener( 'click' )
  onClick() {
    this.form.triggerAction( this.cpxFormAction );
  }

  constructor( public form: FormComponent ) { }
}
