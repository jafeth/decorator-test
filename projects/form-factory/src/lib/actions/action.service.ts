import { Injectable }  from '@angular/core';
import { Subject }     from 'rxjs';
import { ActionEvent } from './action-event';

@Injectable()
export class ActionService {
  public handlers = new Map<string, Function>();
  public enabled = new Set<string>();
  public reaction$ = new Subject<ActionEvent>();

  public trigger( event: ActionEvent ) {
    if ( event.async ) {
      setTimeout( () => this.handleEvent( event ) );
      return;
    }
    this.handleEvent( event );
  }

  private handleEvent( event: ActionEvent ) {
    if ( !this.isEnabled( event.action ) ) {
      return;
    }
    const handler = this.handlers.get( event.action );
    handler( event );
    this.reaction$.next( event );
  }

  public has( action: string ): boolean {
    return this.handlers.has( action );
  }

  public isEnabled( action: string ): boolean {
    return this.enabled.has( action );
  }

  public enable( action: string ): this {
    if ( !this.has( action ) ) {
      return this;
    }
    this.enabled.add( action );
    return this;
  }

  public disable( action: string ): this {
    if ( !this.has( action ) ) {
      return this;
    }
    this.enabled.delete( action );
    return this;
  }

  public set( action: string, handler: Function ): this {
    this.handlers.set( action, handler );
    this.enable( action );
    return this;
  }

  public delete( action: string ): this {
    this.disable( action );
    this.handlers.delete( action );
    return this;
  }
}
