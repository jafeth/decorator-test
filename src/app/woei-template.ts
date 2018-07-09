import { AbstractModel, ControlKey, ControlType, FormModel, ManageModel, ModelCategory, ModelCollection } from '@carapax/form-factory';

@ManageModel<WoeiTemplate>( {
  category   : ModelCategory.Form,
  controlType: ControlType.Group
} )
export class WoeiTemplate extends FormModel {
  readonly type = 'woei';
  @ControlKey() key: string;
  @ModelCollection( ModelCategory.Element ) items: AbstractModel[] = [];

  static parseConfig( config: object ): WoeiTemplate {
    return Object.assign( new WoeiTemplate(), config );
  }
}
