import { Directive, HostListener, Input, Output } from '@angular/core';
import { Observable }                             from 'rxjs';
import { filter }                                 from 'rxjs/operators';
import { FormComponent }                          from '../form/form.component';
import { ActionEvent }                            from './action-event';
import { ActionService }                          from './action.service';

@Directive( {
  selector: '[cpxTrigger][whenKeyIsDown]'
} )
export class TriggerWhenKeyIsDownDirective {
  @Input() cpxTrigger: string;
  @Output() whenKeyIsDown: Observable<ActionEvent>;

  @HostListener( 'keydown', [ '$event' ] )
  onKeydown( event ) {
    if ( !this.cpxTrigger ) {
      return;
    }
    const action = new ActionEvent( this.cpxTrigger );
    action.rootForm = this.form.form;
    action.domEvent = event;
    this.actionService.trigger( action );
  }

  constructor( private form: FormComponent, private actionService: ActionService ) {
    this.whenKeyIsDown = this.actionService.reaction$.pipe(
      filter( event => event.action === this.cpxTrigger )
    );
  }
}
