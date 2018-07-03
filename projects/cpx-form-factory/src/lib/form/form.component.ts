import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl }                                                  from '@angular/forms';
import { Subject }                                                          from 'rxjs';

import { ControlManager } from '../managers/control.manager';
import { ModelManager }   from '../managers/model.manager';
import { AbstractModel }  from '../models/abstract-model';
import { ModelCategory }  from '../models/model-category.enum';
import { FormEvent }      from './form-event';

@Component( {
  selector   : 'cpx-form',
  templateUrl: './form.component.html',
  styleUrls  : [ './form.component.css' ]
} )
export class FormComponent implements OnChanges {
  @Input() config: object;
  @Input() values: object;
  @Output() action = new EventEmitter<FormEvent>();

  trigger$ = new Subject<FormEvent>();

  get template(): AbstractModel {
    if ( !this._template && this.config ) {
      this._template = this.modelManager.parseConfig( ModelCategory.Template, this.config );
    }
    return this._template;
  }

  get form(): AbstractControl {
    if ( !this._form && this.template ) {
      this._form = this.controlManager.buildControl( this.template );
      this._form.patchValue( this.values || {} );
    }
    return this._form;
  }

  private _form: AbstractControl;
  private _template: AbstractModel;

  constructor( private modelManager: ModelManager, private controlManager: ControlManager ) { }

  public ngOnChanges( changes: SimpleChanges ): void {
    const { config, values } = changes;
    if ( config ) {
      this._template = null;
      this._form = null;
    }
    if ( values && this.form ) {
      this.form.patchValue( this.values );
    }
  }

  public triggerAction( action: string ) {
    const event = new FormEvent();
    event.action = action;
    event.rootForm = this.form;
    this.trigger$.next( event );
  }
}
