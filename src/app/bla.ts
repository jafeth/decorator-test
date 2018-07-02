import { ControlType, FormKey, ItemModel, ManageModelAs, ModelCategory, ValidatorCollection } from 'cpx-form-factory';

@ManageModelAs<Bla>( ModelCategory.Element )
export class Bla extends ItemModel {
  readonly type = 'bla';
  @ValidatorCollection() myValidators: object[];
  @FormKey( ControlType.Input ) key: string;
  label: string;
  somethingElse: any = {};

  static parseConfig( config: object ): Bla {
    return Object.assign( new Bla(), config );
  }
}
