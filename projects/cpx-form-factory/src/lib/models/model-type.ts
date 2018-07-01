import { ModelBase } from './model-base';

export interface ModelType<T extends ModelBase> {
  parseConfig( config: object ): T;

  new( ...args: any[] ): T;
}
