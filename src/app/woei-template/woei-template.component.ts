import { Component, OnInit }                                             from '@angular/core';
import { AbstractControl }                                               from '@angular/forms';
import { FormActionHandler, FormEvent, PresentationFor, TemplatePortal } from 'cpx-form-factory';

import { WoeiTemplate } from '../woei-template';

@Component( {
  selector   : 'app-woei-template',
  templateUrl: './woei-template.component.html',
  styleUrls  : [ './woei-template.component.css' ]
} )
@PresentationFor( WoeiTemplate )
export class WoeiTemplateComponent extends TemplatePortal<WoeiTemplate> implements OnInit {
  model: WoeiTemplate;
  form: AbstractControl;

  ngOnInit() {
  }

  @FormActionHandler()
  next( event: FormEvent ) {
    console.log( 'called WoeiTemplate next method' );
    this.onAction.emit( event );
  }

  @FormActionHandler()
  previous( event: FormEvent ) {
    console.log( 'called WoeiTemplate previous method' );
    this.onAction.emit( event );
  }
}
