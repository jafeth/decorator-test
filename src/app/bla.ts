import { AbstractModel, ControlKey, ControlType, ManageModel, ModelCategory, ValidatorCollection } from '@carapax/form-factory';

@ManageModel<Bla>( {
  category   : ModelCategory.Element,
  controlType: ControlType.Input
} )
export class Bla extends AbstractModel {
  readonly type = 'bla';
  @ValidatorCollection() myValidators: object[];
  @ControlKey() key: string;
  label: string;
  somethingElse: any = {};

  static parseConfig( config: object ): Bla {
    return Object.assign( new Bla(), config );
  }
}
