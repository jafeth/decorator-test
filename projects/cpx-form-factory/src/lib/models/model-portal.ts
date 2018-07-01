import { tap } from 'rxjs/operators';

import { ModelBase }   from './model-base';
import { ModelOutlet } from './model-outlet';

const $$trackedProperties = Symbol( 'tracked properties' );
const $$subscription = Symbol( 'subscription to the changes observable' );

export abstract class ModelPortal<T extends ModelBase> {
  abstract model: T;

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

    this[ $$subscription ] = onChange.subscribe( changes => {
      if ( !( 'ngOnChanges' in this ) ) {
        return;
      }
      this[ 'ngOnChanges' ]( changes );
    } );
  }

  public detachFrom( outlet: ModelOutlet<T> ): void {
    if ( $$subscription in this ) {
      this[ $$subscription ].unsubscribe();
    }
  }
}
