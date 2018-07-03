import { OnChanges, OnDestroy, OnInit, SimpleChanges, Type } from '@angular/core';
import { AbstractControl }                                   from '@angular/forms';
import { BehaviorSubject }                                   from 'rxjs';

import { HostDirective } from '../../host/host.directive';
import { AbstractModel } from '../../models/abstract-model';
import { ModelPortal }   from '../../portals/model-portal';
import { DisplayType }   from '../../portals/display-type.enum';

export abstract class ModelOutlet<T extends AbstractModel> implements OnInit, OnChanges, OnDestroy {
  public abstract displayType: DisplayType;
  public abstract model: T;
  public abstract form: AbstractControl;
  public abstract host: HostDirective<ModelPortal<T>>;

  public abstract get componentType(): Type<ModelPortal<T>>;

  public changes$: BehaviorSubject<SimpleChanges>;

  public ngOnInit() {
    this.host.attached.subscribe( portal => {
      portal.attachTo( this );
    } );

    this.host.detaching.subscribe( portal => {
      if ( !portal || !portal.detachFrom ) {
        return;
      }
      portal.detachFrom( this );
    } );
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
  }
}
