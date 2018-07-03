import { ControlKey, ControlType, ManageModel, ModelCategory, ModelCollection, TemplateModel } from 'cpx-form-factory';

@ManageModel<WoeiTemplate>( {
  category   : ModelCategory.Template,
  controlType: ControlType.Group
} )
export class WoeiTemplate extends TemplateModel {
  readonly type = 'woei';
  @ControlKey() key: string;
  @ModelCollection( ModelCategory.Element ) items: TemplateModel[] = [];

  static parseConfig( config: object ): WoeiTemplate {
    return Object.assign( new WoeiTemplate(), config );
  }
}
