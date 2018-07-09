import { OnChanges, OnDestroy, OnInit, SimpleChanges, Type } from '@angular/core';
import { AbstractControl }                                   from '@angular/forms';
import { BehaviorSubject, Subscription }                     from 'rxjs';

import { HostDirective }                from '../../host/host.directive';
import { AbstractModel }                from '../../models/abstract-model';
import { DisplayType }                  from '../../portals/display-type.enum';
import { $$subscriptions, ModelPortal } from '../../portals/model-portal';

export abstract class ModelOutlet<T extends AbstractModel> implements OnInit, OnChanges, OnDestroy {
  public abstract displayType: DisplayType;
  public abstract model: T;
  public abstract form: AbstractControl;
  public abstract host: HostDirective<ModelPortal<T>>;

  public abstract get componentType(): Type<ModelPortal<T>>;

  public changes$: BehaviorSubject<SimpleChanges>;
  private [ $$subscriptions ]: Subscription[] = [];

  public ngOnInit() {
    const { attached, detaching } = this.host;
    this[ $$subscriptions ].push( attached.subscribe( portal => this.onAttach( portal ) ) );
    this[ $$subscriptions ].push( detaching.subscribe( portal => this.onDetach( portal ) ) );
  }

  public ngOnChanges( changes: SimpleChanges ): void {
    if ( !this.changes$ ) {
      this.changes$ = new BehaviorSubject<SimpleChanges>( changes );
      return;
    }
    this.changes$.next( changes );
  }

  public ngOnDestroy(): void {
    this.changes$.complete();
    this[ $$subscriptions ].forEach( subscription => subscription.unsubscribe() );
  }

  public onAttach( portal: ModelPortal<T> ) {
    portal.attachTo( this );
  }

  public onDetach( portal: ModelPortal<T> ) {
    if ( !portal || !portal.detachFrom ) {
      return;
    }
    portal.detachFrom( this );
  }
}
