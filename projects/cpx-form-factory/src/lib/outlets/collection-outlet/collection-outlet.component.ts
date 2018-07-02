import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl }          from '@angular/forms';
import { ItemModel }                from '../../models/item.model';
import { ModelMetadata }            from '../../models/model-metadata';

@Component( {
  selector   : 'cpx-collection-outlet',
  templateUrl: './collection-outlet.component.html',
  styleUrls  : [ './collection-outlet.component.css' ]
} )
export class CollectionOutletComponent implements OnInit {
  @Input() models: ItemModel[];
  @Input() form: AbstractControl;

  constructor() { }

  ngOnInit() {
  }

  controlFor( model: ItemModel ): AbstractControl {
    const { formKey } = ModelMetadata.fromInstance( model );
    if ( !model[ formKey ] ) {
      return null;
    }
    return this.form.get( model[ formKey ] );
  }
}

