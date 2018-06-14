import { ManageItemAs } from './dynamic-forms/decorators/manage-item-as.decorator';
import { InputItemModel } from './dynamic-forms/items/input-item.model';

@ManageItemAs<Bla>( 'woei' )
export class Bla extends InputItemModel {
  somethingElse: any = {};

  static fromConfig( config: object ): Bla {
    return Object.assign( new Bla(), config );
  }
}
