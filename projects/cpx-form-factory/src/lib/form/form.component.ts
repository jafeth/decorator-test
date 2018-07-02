import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl }                            from '@angular/forms';

import { ControlManagerService } from '../controls/control-manager.service';
import { ModelBase }             from '../models/model-base';
import { ModelManagerService }   from '../models/model-manager.service';

@Component( {
  selector   : 'cpx-form',
  templateUrl: './form.component.html',
  styleUrls  : [ './form.component.css' ]
} )
export class FormComponent implements OnChanges {
  @Input() config: any;
  @Input() values: any;

  template: ModelBase;
  form: AbstractControl;

  constructor( private modelManager: ModelManagerService, private controlManager: ControlManagerService ) { }

  public ngOnChanges( changes: SimpleChanges ): void {
  }

}
