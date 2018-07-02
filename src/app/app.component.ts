import { Component, OnInit }                                                               from '@angular/core';
import { AbstractControl, FormControl }                                                    from '@angular/forms';
import { ControlManagerService, ItemModel, ModelBase, ModelCategory, ModelManagerService } from 'cpx-form-factory';

import { WoeiTemplate } from './woei-template';

@Component( {
  selector   : 'app-root',
  templateUrl: './app.component.html',
  styleUrls  : [ './app.component.css' ]
} )
export class AppComponent implements OnInit {
  title = 'app';
  items: ItemModel[];
  form: AbstractControl;
  model: ModelBase;

  constructor( private modelManager: ModelManagerService, private controlManager: ControlManagerService ) {
    const config = {
      type : 'woei',
      key  : 'group',
      order: 0,
      items: [
        {
          type        : 'bla',
          order       : 2,
          label       : 'First Element',
          myValidators: [ { validator: 'required' } ],
          key         : 'first'
        },
        {
          type : 'bla',
          order: 1,
          label: 'Second Element',
          key  : 'second'
        },
        {
          type        : 'bla',
          order       : 0,
          label       : 'Third Element',
          myValidators: [ { validator: 'required' } ],
          key         : 'third'
        }

      ]
    };
    this.model = this.modelManager.parseConfig( ModelCategory.Template, config );
  }

  public ngOnInit(): void {
    this.items = ( this.model as WoeiTemplate ).items;
    this.form = this.controlManager.buildControl( this.model ) as FormControl;

    this.form.valueChanges.subscribe( value => console.log( 'group observer', value ) );
    this.form.get( 'second' )
        .valueChanges
        .subscribe( value => console.log( 'second control observer', value ) );
  }

}
