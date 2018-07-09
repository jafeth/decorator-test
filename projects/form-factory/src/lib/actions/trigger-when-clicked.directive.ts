import { Directive, HostListener, Input, Output } from '@angular/core';
import { Observable }                             from 'rxjs';
import { filter }                                 from 'rxjs/operators';
import { FormComponent }                          from '../form/form.component';
import { ActionEvent }                            from './action-event';
import { ActionService }                          from './action.service';

@Directive( {
  selector: '[cpxTrigger][whenClicked]'
} )
export class TriggerWhenClickedDirective {
  @Input() cpxTrigger: string;
  @Output() whenClicked: Observable<ActionEvent>;

  @HostListener( 'click', [ '$event' ] )
  onClick( event ) {
    if ( !this.cpxTrigger ) {
      return;
    }
    const action = new ActionEvent( this.cpxTrigger );
    action.rootForm = this.form.form;
    action.domEvent = event;
    this.actionService.trigger( action );
  }

  constructor( private form: FormComponent, private actionService: ActionService ) {
    this.whenClicked = this.actionService.reaction$.pipe(
      filter( event => event.action === this.cpxTrigger )
    );
  }
}
