import { InputItemModel, ManageModelAs, ModelCategory, ValidatorCollection } from 'cpx-form-factory';

@ManageModelAs<Bla>( ModelCategory.Element )
export class Bla extends InputItemModel {
  readonly type = 'woei';
  somethingElse: any = {};

  @ValidatorCollection() myValidators: object[];

  static parseConfig( config: object ): Bla {
    return Object.assign( new Bla(), config );
  }
}
