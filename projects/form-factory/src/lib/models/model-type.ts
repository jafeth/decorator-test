import { AbstractModel } from './abstract-model';

export interface ModelType<T extends AbstractModel> {
  parseConfig( config: object ): T;

  new( ...args: any[] ): T;
}
