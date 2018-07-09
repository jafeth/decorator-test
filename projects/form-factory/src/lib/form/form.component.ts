import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl }                                                  from '@angular/forms';
import { Observable }                                                       from 'rxjs';
import { ActionEvent }                                                      from '../actions/action-event';
import { ActionService }                                                    from '../actions/action.service';

import { ControlManager } from '../managers/control.manager';
import { ModelManager }   from '../managers/model.manager';
import { FormModel }      from '../models/form-model';

@Component( {
  selector   : 'cpx-form',
  templateUrl: './form.component.html',
  styleUrls  : [ './form.component.css' ],
  providers  : [ ActionService ]
} )
export class FormComponent implements OnChanges {
  @Input() config: object;
  @Input() values: object;
  @Output() reaction: Observable<ActionEvent>;

  get model(): FormModel {
    if ( !this._model && this.config ) {
      this._model = this.modelManager.parseForm( this.config );
    }
    return this._model;
  }

  get form(): AbstractControl {
    if ( !this._form && this.model ) {
      this._form = this.controlManager.buildControl( this.model );
      this._form.patchValue( this.values || {} );
    }
    return this._form;
  }

  private _form: AbstractControl;
  private _model: FormModel;

  constructor( private modelManager: ModelManager, private controlManager: ControlManager, private actionService: ActionService ) {
    this.reaction = this.actionService.reaction$.pipe();
  }

  public ngOnChanges( changes: SimpleChanges ): void {
    const { config, values } = changes;
    if ( config ) {
      this._model = null;
      this._form = null;
    }
    if ( values && this.form ) {
      this.form.patchValue( this.values );
    }
  }

  public isActionEnabled( action: string ): boolean {
    return this.actionService.isEnabled( action );
  }
}
