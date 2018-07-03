import { Component, Input } from '@angular/core';
import { AbstractControl }  from '@angular/forms';
import { AbstractModel }    from '../../models/abstract-model';
import { ModelMetadata }    from '../../models/model-metadata';

@Component( {
  selector   : 'cpx-collection-outlet',
  templateUrl: './collection-outlet.component.html',
  styleUrls  : [ './collection-outlet.component.css' ]
} )
export class CollectionOutletComponent {
  @Input() models: AbstractModel[];
  @Input() form: AbstractControl;

  controlFor( model: AbstractModel ): AbstractControl {
    const { controlKey } = ModelMetadata.fromInstance( model );
    if ( !model[ controlKey ] ) {
      return null;
    }
    return this.form.get( model[ controlKey ] );
  }
}

