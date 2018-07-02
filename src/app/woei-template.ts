import { ControlType, FormKey, ItemModel, ManageModelAs, ModelCategory, ModelCollection } from 'cpx-form-factory';

@ManageModelAs<WoeiTemplate>( ModelCategory.Template )
export class WoeiTemplate extends ItemModel {
  readonly type = 'woei';
  @FormKey( ControlType.Group ) key: string;
  @ModelCollection( ModelCategory.Element ) items: ItemModel[] = [];

  static parseConfig( config: object ): WoeiTemplate {
    return Object.assign( new WoeiTemplate(), config );
  }
}
