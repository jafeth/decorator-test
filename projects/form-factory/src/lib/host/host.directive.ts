import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnDestroy, SimpleChanges, Type, ViewContainerRef
}                  from '@angular/core';
import { Subject } from 'rxjs';

@Directive( {
  selector: '[cpxHost]'
} )
export class HostDirective<T> implements OnDestroy, OnChanges {
  @Input() componentType: Type<T>;

  public attached = new Subject<T>();
  public detaching = new Subject<T | null>();

  private ref: ComponentRef<T>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private cfResolver: ComponentFactoryResolver
  ) { }

  public ngOnChanges( changes: SimpleChanges ): void {
    if ( !this.componentType ) {
      this.detach();
      return;
    }
    this.attach( this.componentType );
  }

  public attach( component: Type<T> ): void {
    this.detach();
    const factory = this.cfResolver.resolveComponentFactory( component );
    this.ref = this.viewContainerRef.createComponent( factory, this.viewContainerRef.length, this.viewContainerRef.injector );
    this.attached.next( this.ref.instance );
  }

  public detach(): void {
    this.detaching.next( this.ref ? this.ref.instance : null );
    this.viewContainerRef.clear();
    this.ref = undefined;
  }

  public ngOnDestroy(): void {
    this.detach();
    this.attached.complete();
    this.detaching.complete();
  }

}
