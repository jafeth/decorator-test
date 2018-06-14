import { ItemOutlet } from './item-outlet';

export interface ItemPortal {
  attachTo( outlet: ItemOutlet ): void;

  detachFrom?( outlet: ItemOutlet ): void;
}
