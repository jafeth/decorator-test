import { AbstractControl } from '@angular/forms';
import { Subscription }    from 'rxjs';
import { tap }             from 'rxjs/operators';

import { AbstractModel } from '../models/abstract-model';
import { ModelOutlet }   from '../outlets/model-outlet/model-outlet';
import { DisplayType }   from './display-type.enum';

const $$trackedProperties = Symbol( 'tracked properties' );
export const $$subscriptions = Symbol( 'subscriptions' );

export abstract class ModelPortal<T extends AbstractModel> {
  abstract model: T;
  form: AbstractControl;
  displayType: DisplayType;
  protected [ $$subscriptions ]: Subscription[] = [];

  public attachTo( outlet: ModelOutlet<T> ): void {
    this[ $$trackedProperties ] = new Set( [] );

    const onChange = outlet.changes$.pipe(
      tap( changes => {
        for ( const prop in changes ) {
          if ( !changes.hasOwnProperty( prop ) ) {
            continue;
          }
          const change = changes[ prop ];
          this[ prop ] = change.currentValue;
          change.firstChange = !this[ $$trackedProperties ].has( prop );
          this[ $$trackedProperties ].add( prop );
        }
      } )
    );

    this[ $$subscriptions ].push( onChange.subscribe( changes => {
      if ( !( 'ngOnChanges' in this ) ) {
        return;
      }
      this[ 'ngOnChanges' ]( changes );
    } ) );
  }

  public detachFrom( outlet: ModelOutlet<T> ): void {
    this[ $$subscriptions ].forEach( subscription => subscription.unsubscribe() );
    this[ $$subscriptions ] = [];
  }
}
