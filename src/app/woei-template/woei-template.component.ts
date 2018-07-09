import { Component, OnInit }                                                            from '@angular/core';
import { AbstractControl }                                                              from '@angular/forms';
import { ActionEvent, ActionService, FormPortal, PortalActionHandler, PresentationFor } from '@carapax/form-factory';

import { WoeiTemplate } from '../woei-template';

@Component( {
  selector   : 'app-woei-template',
  templateUrl: './woei-template.component.html',
  styleUrls  : [ './woei-template.component.css' ]
} )
@PresentationFor( WoeiTemplate )
export class WoeiTemplateComponent extends FormPortal<WoeiTemplate> implements OnInit {
  model: WoeiTemplate;
  form: AbstractControl;
  progress = 0;

  constructor( private actionService: ActionService ) {
    super();
  }

  ngOnInit() {
  }

  @PortalActionHandler()
  next( event: ActionEvent ) {
    this.progress++;
    event.progress = this.progress;
    this.actionService
        .disable( 'next' )
        .enable( 'previous' );
  }

  @PortalActionHandler()
  previous( event: ActionEvent ) {
    this.progress--;
    event.progress = this.progress;
    this.actionService
        .disable( 'previous' )
        .enable( 'next' );
  }
}
