import { Component, OnInit }                 from '@angular/core';
import { AbstractControl }                   from '@angular/forms';
import { ItemPortal, PresentationPortalFor } from 'cpx-form-factory';

import { WoeiTemplate } from '../woei-template';

@Component( {
  selector   : 'app-woei-template',
  templateUrl: './woei-template.component.html',
  styleUrls  : [ './woei-template.component.css' ]
} )
@PresentationPortalFor( WoeiTemplate )
export class WoeiTemplateComponent extends ItemPortal<WoeiTemplate> implements OnInit {
  model: WoeiTemplate;
  form: AbstractControl;

  ngOnInit() {
  }

}
